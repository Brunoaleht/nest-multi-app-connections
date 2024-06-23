import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

import { ReserverSpotDto } from './dto/reserve-spot.dto';
import { Prisma, SpotStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const createdEvent = await this.prismaService.event.create({
      data: { ...createEventDto, date: new Date(createEventDto.date) },
    });
    return createdEvent;
  }

  async findAll() {
    return await this.prismaService.event.findMany();
  }

  async findOne(id: string) {
    const eventFound = await this.prismaService.event.findUnique({
      where: { id },
    });
    if (!eventFound) {
      throw new NotFoundException('Event not found');
    }

    return eventFound;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.findOne(id);

    const currentDateUpdate = new Date(updateEventDto.date);

    const updatedEvent = await this.prismaService.event.update({
      where: { id },
      data: { ...updateEventDto, date: currentDateUpdate },
    });

    return updatedEvent;
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prismaService.event.delete({
      where: { id },
    });
  }

  async reserverSpot(reserverSpotDto: ReserverSpotDto & { eventId: string }) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        eventId: reserverSpotDto?.eventId,
        name: {
          in: reserverSpotDto?.spots,
        },
      },
    });
    if (spots?.length !== reserverSpotDto?.spots?.length) {
      const foundSpotsName = spots.map((spot) => spot.name);
      const notFoundSpotsName = reserverSpotDto?.spots.filter(
        (spot) => !foundSpotsName.includes(spot),
      );
      throw new NotFoundException(
        `Spots not found: ${notFoundSpotsName.join(', ')}`,
      );
    }

    try {
      const tickets = await this.prismaService.$transaction(
        async (prisma) => {
          // Cria entradas na tabela reservationHistory
          await prisma.reservationHistory.createMany({
            data: spots.map((spot) => ({
              email: reserverSpotDto.email,
              spotId: spot.id,
              ticketKind: reserverSpotDto.ticket_kind,
              status: SpotStatus.reserved,
            })),
          });

          // Atualiza o status dos spots
          await prisma.spot.updateMany({
            where: {
              id: {
                in: spots.map((spot) => spot.id),
              },
            },
            data: {
              status: SpotStatus.reserved,
            },
          });

          // Cria tickets e retorna os resultados
          const tickets = await Promise.all(
            spots.map((spot) =>
              prisma.ticket.create({
                data: {
                  email: reserverSpotDto.email,
                  spotId: spot.id,
                  ticketKind: reserverSpotDto.ticket_kind,
                },
              }),
            ),
          );

          return tickets;
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted },
      );

      return tickets;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002': // erro de restrição única
            throw new NotFoundException('Spot already reserved');
          case 'P2034': // conflito de transação
            throw new Error('Transaction conflict, try again later');
          // Adicione outros códigos de erro do Prisma conforme necessário
          default:
            throw error;
        }
      }
      throw error;
    }
  }
}
