import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { DB_CONNECTION } from './database/database.connection';
import { DatabaseModule } from './database/database.module';
import { PrismaClient } from 'generated/prisma/client';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (db: PrismaClient) => ({
        auth: betterAuth({
          database: prismaAdapter(db, { provider: 'postgresql' }),
          emailAndPassword: { enabled: true },
        }),
      }),
      inject: [DB_CONNECTION],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
