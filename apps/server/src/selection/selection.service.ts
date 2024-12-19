import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SelectionService {
  constructor(private readonly prisma: PrismaService) { }

  // create a new selection
  async create(data: CreateSelectionDto, userId: string) {
    // Step 1: Verify candidate profile exists
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId },
    });

    if (!candidate) {
      throw new HttpException('Candidate profile not found', HttpStatus.NOT_FOUND);
    }

    // Step 2: Check if the candidate has already applied for this job
    const existingSelection = await this.prisma.selection.findUnique({
      where: {
        candidateId_jobId: {
          candidateId: candidate.id,
          jobId: data.jobId,
        },
      },
    });

    if (existingSelection) {
      throw new HttpException('Already applied for this job', HttpStatus.CONFLICT);
    }

    // Step 3: Create the selection entry
    const newSelection = await this.prisma.selection.create({
      data: {
        candidateId: candidate.id,
        jobId: data.jobId,
        status: data.status,
      },
    });

    return {
      message: 'Successfully applied for the job',
      success: true,
      data: newSelection,
    }
  }

  // get selection by id
  async findOne(id: string, user: any) {
    this.isRecruiter(user);

    const selection = await this.prisma.selection.findUnique({
      where: { id },
    });

    if (!selection) {
      throw new HttpException('Selection not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Selection found',
      success: true,
      data: selection
    }
  }

  // get selection by jobId
  async findByJobId(jobId: string, user: any) {
    this.isRecruiter(user);
    // Step 1: Verify the job exists
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
    }

    // Step 2: Fetch selections associated with the job
    const selection = await this.prisma.selection.findMany({
      where: { jobId },
    });

    return {
      message: 'Selections found',
      success: true,
      data: selection
    }
  }


  // get selection by userId
  async findByUserId(user: any) {
    const userId = user.sub;

    if (user.role !== 'CANDIDATE') {
      return {
        message: 'Unauthorized',
        success: false,
      }
    }

    // Step 1: Find the candidate profile by userId
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId }
    });

    // Step 2: Fetch selections associated with the candidateId
    const selection = await this.prisma.selection.findMany({
      where: { candidateId: candidate.id },
    });

    return {
      message: 'Selections found',
      success: true,
      data: selection
    }
  }

  async update(id: string, data: UpdateSelectionDto, user: any) {
    this.isRecruiter(user);

    const selection = await this.prisma.selection.findUnique({
      where: { id },
    })

    if (!selection) {
      throw new HttpException('Selection not found', HttpStatus.NOT_FOUND);
    }

    const updatedSelection = await this.prisma.selection.update({
      where: { id },
      data
    });

    return {
      message: 'Status updated',
      success: true,
      data: updatedSelection
    }
  }

  private isRecruiter(user: any) {
    const recruiter = user.role === 'RECRUITER';
    if (!recruiter) {
      return {
        message: 'Unauthorized',
        success: false,
      }
    }
  }
}
