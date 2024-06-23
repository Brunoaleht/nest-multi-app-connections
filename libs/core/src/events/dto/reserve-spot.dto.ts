import { TicketKind } from '@prisma/client';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReserverSpotDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  ticket_kind: TicketKind;

  @IsOptional()
  spots?: string[];
}
