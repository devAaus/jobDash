import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SelectionService {
  constructor(private readonly prisma: PrismaService) { }

  // async create(data: CreateSelectionDto, userId: string ) {

  //   const existingSelection = await this.prisma.selection.findUnique({
  //     where: {
  //       userId_jobId: {
  //         userId,
  //         jobId,
  //       },
  //     },
  //   });

  //   if (existingSelection) {
  //     throw new HttpException('Already applied for this job', HttpStatus.CONFLICT);
  //   }

  //   return await this.prisma.selection.create({
  //     data: {
  //       userId,
  //       jobId,
  //       ...selectionData,
  //     },
  //   });
  // }


  async findAll() {
    return await this.prisma.selection.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.selection.findUnique({
      where: { id },
    });
  }

  // async findByUserId(userId: string) {
  //   return await this.prisma.selection.findMany({
  //     where: { userId }
  //   });
  // }

  // async update(id: string, updateSelectionDto: UpdateSelectionDto) {
  //   return await this.prisma.selection.update({
  //     where: { id },
  //     data: updateSelectionDto,
  //   });
  // }

  async remove(id: string) {
    return await this.prisma.selection.delete({
      where: { id },
    });
  }
}
