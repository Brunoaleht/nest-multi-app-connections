import { Module } from '@nestjs/common';
import { EventsCoreModule } from '@app/core/events/events-core.module';
import { MattersController } from './matter.controller';

@Module({
  imports: [EventsCoreModule],
  controllers: [MattersController],
})
export class MattersModule {}
