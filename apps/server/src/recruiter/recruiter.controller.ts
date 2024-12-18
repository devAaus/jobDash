import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { GetCurrentUserId, Public } from 'src/auth/decorator';
import { AtGuard } from 'src/auth/guard';

@Controller('api/recruiter')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) { }

  @Post()
  async create(
    @Body() createRecruiterDto: CreateRecruiterDto,
    @GetCurrentUserId() userId: string
  ) {
    return this.recruiterService.create({ ...createRecruiterDto, userId });
  }

  @Get()
  findAll() {
    return this.recruiterService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruiterService.findOne(id);
  }

  @UseGuards(AtGuard)
  @Get('/user/profile')
  findByUserId(@GetCurrentUserId() userId: string) {
    return this.recruiterService.findByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecruiterDto: UpdateRecruiterDto) {
    return this.recruiterService.update(id, updateRecruiterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruiterService.remove(id);
  }
}
