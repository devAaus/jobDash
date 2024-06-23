import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidateService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCandidateDto: CreateCandidateDto & { userId: number }) {
    const { userId, ...data } = createCandidateDto;
    return await this.prisma.candidate.create({
      data: {
        ...data,
        user: {
          connect: { id: userId }
        }
      }
    })
  }

  async findAll() {
    return await this.prisma.candidate.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.candidate.findUnique({
      where: {
        id
      }
    })
  }

  async findByUserId(userId: number) {
    return await this.prisma.candidate.findUnique({
      where: {
        userId
      }
    });
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return await this.prisma.candidate.update({
      where: { id },
      data: updateCandidateDto
    })
  }

  async remove(id: number) {
    return await this.prisma.candidate.delete({
      where: { id }
    })
  }
}
