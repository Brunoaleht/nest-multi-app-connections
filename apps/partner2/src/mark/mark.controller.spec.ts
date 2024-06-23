import { Test, TestingModule } from '@nestjs/testing';
import { MarksController } from './mark.controller';
import { SpotsService } from '@app/core/spots/spots.service';

describe('SpotsController', () => {
  let controller: MarksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarksController],
      providers: [SpotsService],
    }).compile();

    controller = module.get<MarksController>(MarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
