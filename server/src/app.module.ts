import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { DB_CONNECTION } from './database/database.connection';
import { DatabaseModule } from './database/database.module';
import { PrismaClient } from 'generated/prisma/client';
import { FoldersModule } from './folders/folders.module';
import { SnippetsModule } from './snippets/snippets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (db: PrismaClient) => ({
        auth: betterAuth({
          database: prismaAdapter(db, { provider: 'postgresql' }),
          emailAndPassword: { enabled: true },
          trustedOrigins: ['http://localhost:5173'],
        }),
      }),
      inject: [DB_CONNECTION],
    }),
    FoldersModule,
    SnippetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
