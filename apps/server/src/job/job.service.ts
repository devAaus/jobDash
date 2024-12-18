import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateJobDto, user: any) {

    // // Check if the user has the 'recruiter' role
    if (user.role !== 'RECRUITER') {
      return {
        message: 'You do not have permission to create a job.',
        success: false,
      }
    }

    const newJob = await this.prisma.job.create({
      data: {
        ...data,
        user: {
          connect: { id: user.sub },
        },
      },
    });

    return {
      message: 'Job created successfully',
      success: true,
      job: newJob
    }
  }

  async findAll() {
    const jobs = await this.prisma.job.findMany();

    return {
      message: 'Jobs found successfully',
      success: true,
      jobs
    }
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
