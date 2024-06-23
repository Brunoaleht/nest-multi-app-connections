import { PrismaModule } from '@app/core/prisma/prisma.module';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MattersModule } from './matter/matter.module';
import { MarksModule } from './mark/mark.module';
import { AuthModule } from '@app/core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner2', isGlobal: true }),
    PrismaModule,
    AuthModule,
    MattersModule,
    MarksModule,
  ],
})
export class Partner2Module {}
