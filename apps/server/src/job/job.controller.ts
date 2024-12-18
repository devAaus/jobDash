import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AtGuard } from 'src/auth/guard';
import { GetCurrentUser, Public } from 'src/auth/decorator';

@Controller('api/job')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @UseGuards(AtGuard)
  @Post()
  async create(
    @Body() data: CreateJobDto,
    @GetCurrentUser() user: any,
  ) {
    return this.jobService.create(data, user);
  }

  @Public()
  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.jobService.findOne(+id);
  }


  @UseGuards(AtGuard)
  @Get('/user/jobs')
  findByUserId(@GetCurrentUser() userId: number) {
    return this.jobService.findByUserId(userId);
  }

  @UseGuards(AtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @UseGuards(AtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }

  @Public()
  @Get('search/title')
  async findByTitle(@Query('title') title: string) {
    return this.jobService.findByTitle(title);
  }
}
