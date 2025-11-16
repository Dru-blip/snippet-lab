import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { DB_CONNECTION } from 'src/database/database.connection';
import { CreateFolderSchema } from './schema/createFolder.schema';

@Injectable()
export class FolderService {
  constructor(@Inject(DB_CONNECTION) private readonly db: PrismaClient) {}

  async getAll(userId: string) {
    const folders = await this.db.folder.findMany({
      where: { userId },
    });
    return folders;
  }

  async create(userId: string, schema: CreateFolderSchema) {
    const folder = await this.db.folder.create({
      data: { parentFolderId: schema.parentId, name: schema.name, userId },
    });
    return folder;
  }
}
