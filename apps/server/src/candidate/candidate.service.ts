import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidateService {
  constructor(private readonly prisma: PrismaService) { }

  // Create a new candidate profile
  async create(data: CreateCandidateDto, userId: string) {

    try {
      // Check if a candidate profile already exists for this userId
      const existingCandidate = await this.prisma.candidate.findUnique({
        where: { userId },
      });

      if (existingCandidate) {
        return {
          message: `A candidate profile already exists.`,
          success: false,
        };
      }

      // Create a new candidate if no existing profile is found
      const newCandidate = await this.prisma.candidate.create({
        data: {
          ...data,
          user: {
            connect: { id: userId },
          },
        },
        include: { user: true, },
      });

      return {
        message: `Candidate created successfully.`,
        success: true,
        candidate: this.candidateData(newCandidate),
      };
    } catch (error) {
      console.error(`Error creating candidate for userId ${userId}:`, error);
      throw new Error('Failed to create candidate');
    }
  }


  // Fetch all candidates
  async findOne(id: string) {
    return await this.prisma.candidate.findUnique({
      where: {
        id
      }
    })
  }


  // Fetch user profile
  async userProfile(userId: string) {
    try {
      const profile = await this.prisma.candidate.findUnique({
        where: { userId },
        include: { user: true }
      });

      if (!profile) {
        console.log(`No profile found for userId: ${userId}`);
        return {
          message: `User profile not found. Please create a profile first`,
          success: false,
        };
      }

      return {
        message: `User profile found.`,
        success: true,
        profile: this.candidateData(profile)
      };
    } catch (error) {
      console.error(`Error fetching profile for userId ${userId}:`, error);
      throw new Error('Failed to fetch user profile');
    }
  }


  // Update candidate's profile
  async update(userId: string, updateCandidateDto: UpdateCandidateDto) {
    try {
      // Check if the candidate exists
      const existingCandidate = await this.prisma.candidate.findUnique({
        where: { userId },
      });

      if (!existingCandidate) {
        return {
          message: `Candidate not found.`,
          success: false,
        };
      }

      // Perform the update
      const updatedCandidate = await this.prisma.candidate.update({
        where: { userId },
        include: { user: true },
        data: updateCandidateDto,
      });

      return {
        message: `Candidate updated successfully.`,
        success: true,
        candidate: this.candidateData(updatedCandidate),
      };
    } catch (error) {
      console.error(`Error updating candidate`, error);
      throw new Error('Failed to update candidate');
    }
  }

  private candidateData(data: any) {
    return {
      candidateId: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      skills: data.skills,
      experience: data.experience,
      education: data.education,
      portfolio: data.portfolio,
      github: data.github,
      email: data.user?.email
    };
  }
}
