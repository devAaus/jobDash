import { Test, TestingModule } from '@nestjs/testing';
import { SelectionController } from './selection.controller';
import { SelectionService } from './selection.service';

describe('SelectionController', () => {
  let controller: SelectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionController],
      providers: [SelectionService],
    }).compile();

    controller = module.get<SelectionController>(SelectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
