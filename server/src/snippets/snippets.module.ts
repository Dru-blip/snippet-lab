import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';

@Module({
  imports: [DatabaseModule],
  providers: [SnippetsService],
  controllers: [SnippetsController],
  exports: [],
})
export class SnippetsModule {}
