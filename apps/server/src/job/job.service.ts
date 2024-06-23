import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createJobDto: CreateJobDto & { userId: number }) {
    const { userId, ...jobData } = createJobDto;
    return await this.prisma.job.create({
      data: {
        ...jobData,
        user: {
          connect: { id: userId }
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.job.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.job.findUnique({
      where: { id }
    })
  }

  async findByUserId(userId: number) {
    return await this.prisma.job.findMany({
      where: { userId }
    });
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    return await this.prisma.job.update({
      where: { id },
      data: updateJobDto
    });
  }

  async remove(id: number) {
    return await this.prisma.job.delete({
      where: { id }
    });
  }

  async findByTitle(title: string) {
    try {
      return await this.prisma.job.findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to search for jobs by title');
    }
  }
}
