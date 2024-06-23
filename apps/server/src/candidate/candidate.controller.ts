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
    @Body() createCandidateDto: CreateCandidateDto,
    @GetCurrentUserId() userId: number
  ) {
    return this.candidateService.create({ ...createCandidateDto, userId });
  }

  @Get()
  findAll() {
    return this.candidateService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateService.findOne(+id);
  }

  @UseGuards(AtGuard)
  @Get('/user/profile')
  findByUserId(@GetCurrentUserId() userId: number) {
    return this.candidateService.findByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto) {
    return this.candidateService.update(+id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateService.remove(+id);
  }
}
