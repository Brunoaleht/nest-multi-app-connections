import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from '@app/core/events/events.service';
import { CreateMatterRequest } from './request/create-matter.request';
import { UpdateMatterRequest } from './request/update-matter.request';
import { ReserverSpotRequest } from './request/reserve-spot.request';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('matters')
export class MattersController {
  constructor(private readonly mattersService: EventsService) {}

  @Post()
  async create(@Body() createMatterDto: CreateMatterRequest) {
    return await this.mattersService.create(createMatterDto);
  }

  @Get()
  async findAll() {
    return await this.mattersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mattersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMatterDto: UpdateMatterRequest,
  ) {
    return await this.mattersService.update(id, updateMatterDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.mattersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reserve')
  async reserveSpot(
    @Param('id') id: string,
    @Body() body: ReserverSpotRequest,
  ) {
    return await this.mattersService.reserverSpot({ ...body, eventId: id });
  }
}
