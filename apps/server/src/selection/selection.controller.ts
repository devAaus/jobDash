import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SelectionService } from './selection.service';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { GetCurrentUserId } from 'src/auth/decorator';
import { AtGuard } from 'src/auth/guard';

@Controller('api/selection')
export class SelectionController {
  constructor(private readonly selectionService: SelectionService) { }

  // @Post()
  // create(
  //   @Body() data: CreateSelectionDto,
  //   @GetCurrentUserId() userId: string
  // ) {
  //   return this.selectionService.create(data, userId);
  // }

  @Get()
  findAll() {
    return this.selectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionService.findOne(id);
  }

  // @UseGuards(AtGuard)
  // @Get('/user/selection')
  // findByUserId(@GetCurrentUserId() userId: string) {
  //   return this.selectionService.findByUserId(userId);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSelectionDto: UpdateSelectionDto) {
  //   return this.selectionService.update(id, updateSelectionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selectionService.remove(id);
  }
}
