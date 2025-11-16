import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FoldersController } from './folders.controller';
import { FolderService } from './folders.service';

@Module({
  imports: [DatabaseModule],
  providers: [FolderService],
  controllers: [FoldersController],
  exports: [],
})
export class FoldersModule {}
