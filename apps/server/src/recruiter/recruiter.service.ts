import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecruiterService {
  constructor(private readonly prisma: PrismaService) { }


  async create(createRecruiterDto: CreateRecruiterDto & { userId: string }) {
    const { userId, ...recruiterData } = createRecruiterDto;

    // Check if the recruiter already has data
    const existingRecruiter = await this.findByUserId(userId);
    if (existingRecruiter) {
      throw new ConflictException('Recruiter already has data entry');
    }

    // If not, create a new data entry
    return await this.prisma.recruiter.create({
      data: {
        ...recruiterData,
        user: {
          connect: { id: userId }
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.recruiter.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.recruiter.findUnique({ where: { id } })
  }

  async findByUserId(userId: string) {
    return await this.prisma.recruiter.findUnique({
      where: {
        userId
      }
    });
  }

  async update(id: string, updateRecruiterDto: UpdateRecruiterDto) {
    return await this.prisma.recruiter.update({
      where: { id },
      data: updateRecruiterDto
    })
  }

  async remove(id: string) {
    return await this.prisma.recruiter.delete({ where: { id } })
  }
}
