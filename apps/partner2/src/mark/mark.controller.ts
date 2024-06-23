import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { SpotsService } from '@app/core/spots/spots.service';
import { CreateMarkRequest } from './request/create-mark.request';
import { UpdateMarkRequest } from './request/update-mark.request';

@Controller('matters/:eventId/marks')
export class MarksController {
  constructor(private readonly marksService: SpotsService) {}

  @Post()
  async create(
    @Body() createMarkDto: CreateMarkRequest,
    @Param('eventId') eventId: string,
  ) {
    return await this.marksService.create({ ...createMarkDto, eventId });
  }

  @Get()
  async findAll(@Param('eventId') eventId: string) {
    return await this.marksService.findAll(eventId);
  }

  @Get(':spotId')
  async findOne(
    @Param('spotId') spotId: string,
    @Param('eventId') eventId: string,
  ) {
    return await this.marksService.findOne(eventId, spotId);
  }

  @Patch(':spotId')
  async update(
    @Param('spotId') spotId: string,
    @Param('eventId') eventId: string,
    @Body() updateSpotDto: UpdateMarkRequest,
  ) {
    return await this.marksService.update(eventId, spotId, updateSpotDto);
  }

  @HttpCode(204)
  @Delete(':spotId')
  async remove(
    @Param('spotId') spotId: string,
    @Param('eventId') eventId: string,
  ) {
    return await this.marksService.remove(eventId, spotId);
  }
}
