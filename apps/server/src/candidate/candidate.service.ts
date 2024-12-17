import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidateService {
  constructor(private readonly prisma: PrismaService) { }

  // Create a new candidate profile
  async create(data: CreateCandidateDto, userId: number) {

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
  async findOne(id: number) {
    return await this.prisma.candidate.findUnique({
      where: {
        id
      }
    })
  }


  // Fetch user profile
  async userProfile(userId: number) {
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
  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    try {
      // Check if the candidate exists
      const existingCandidate = await this.prisma.candidate.findUnique({
        where: { id },
      });

      if (!existingCandidate) {
        return {
          message: `Candidate with id ${id} not found.`,
          success: false,
        };
      }

      // Perform the update
      const updatedCandidate = await this.prisma.candidate.update({
        where: { id },
        data: updateCandidateDto,
      });

      return {
        message: `Candidate updated successfully.`,
        success: true,
        candidate: updatedCandidate,
      };
    } catch (error) {
      console.error(`Error updating candidate with id ${id}:`, error);
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
      userEmail: data.user?.email,
      userUsername: data.user?.username,
      userRole: data.user?.role
    };
  }
}
