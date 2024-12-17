import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { GetCurrentUserId, Public } from 'src/auth/decorator';
import { AtGuard } from 'src/auth/guard';

@Controller('api/candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) { }

  @Post()
  create(
    @Body() data: CreateCandidateDto,
    @GetCurrentUserId() userId: number
  ) {
    return this.candidateService.create(data, userId);
  }


  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateService.findOne(+id);
  }

  @UseGuards(AtGuard)
  @Get('/user/profile')
  userProfile(@GetCurrentUserId() userId: number) {
    return this.candidateService.userProfile(userId);
  }

  @Patch()
  update(
    @GetCurrentUserId() userId: number,
    @Body() updateCandidateDto: UpdateCandidateDto
  ) {
    return this.candidateService.update(userId, updateCandidateDto);
  }
}
