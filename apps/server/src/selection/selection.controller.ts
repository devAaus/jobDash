import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SelectionService } from './selection.service';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { GetCurrentUser } from 'src/auth/decorator';
import { AtGuard } from 'src/auth/guard';

@Controller('api/selection')
export class SelectionController {
  constructor(private readonly selectionService: SelectionService) { }

  @Post()
  create(
    @Body() data: CreateSelectionDto,
    @GetCurrentUser() user: any
  ) {
    const userId = user.sub;
    return this.selectionService.create(data, userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetCurrentUser() user: any
  ) {
    return this.selectionService.findOne(id, user);
  }

  @Get('/job/:jobId')
  findByJobId(
    @Param('jobId') jobId: string,
    @GetCurrentUser() user: any
  ) {
    return this.selectionService.findByJobId(jobId, user);
  }

  @UseGuards(AtGuard)
  @Get('/user/selection')
  findByUserId(@GetCurrentUser() user: any) {
    return this.selectionService.findByUserId(user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateSelectionDto,
    @GetCurrentUser() user: any
  ) {
    return this.selectionService.update(id, data, user);
  }
}
