import { Test, TestingModule } from '@nestjs/testing';
import { MattersController } from './matter.controller';
import { EventsService } from '@app/core/events/events.service';

describe('EventsController', () => {
  let controller: MattersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MattersController],
      providers: [EventsService],
    }).compile();

    controller = module.get<MattersController>(MattersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
