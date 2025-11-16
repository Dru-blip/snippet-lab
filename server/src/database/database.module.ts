import { Module } from '@nestjs/common';
import PrismaService from './database.service';
import { DB_CONNECTION } from './database.connection';

// Module For Managing and Connecting Databases
@Module({
  imports: [],
  providers: [{ provide: DB_CONNECTION, useClass: PrismaService }],
  exports: [DB_CONNECTION],
})
export class DatabaseModule {}
