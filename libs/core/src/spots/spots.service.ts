import { HttpException, Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';

import { SpotStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: createSpotDto.eventId,
      },
    });

    if (!event) throw new HttpException('Event not found', 404);

    return this.prismaService.spot.create({
      data: { ...createSpotDto, status: SpotStatus.available },
    });
  }

  async findAll(eventId: string) {
    return await this.prismaService.spot.findMany({
      where: {
        eventId,
      },
    });
  }

  async findOne(eventId: string, spotId: string) {
    const spot = await this.prismaService.spot.findUnique({
      where: {
        id: spotId,
        eventId,
      },
    });

    if (!spot) {
      throw new HttpException(
        'Spot not found or does not belong to the event',
        404,
      );
    }

    return spot;
  }

  async update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    await this.findOne(eventId, spotId);
    const updatedSpot = await this.prismaService.spot.update({
      where: {
        id: spotId,
        eventId,
      },
      data: updateSpotDto,
    });

    return updatedSpot;
  }

  async remove(eventId: string, spotId: string) {
    await this.findOne(eventId, spotId);
    return await this.prismaService.spot.delete({
      where: {
        id: spotId,
        eventId,
      },
    });
  }
}
