import { Module } from '@nestjs/common';
import { SpotsCoreModule } from '@app/core/spots/spots-core.module';
import { MarksController } from './mark.controller';

@Module({
  imports: [SpotsCoreModule],
  controllers: [MarksController],
})
export class MarksModule {}
