import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { DB_CONNECTION } from 'src/database/database.connection';
import { CreateSnippetSchema } from './schema/createSnippet.schema';

@Injectable()
export class SnippetsService {
  constructor(@Inject(DB_CONNECTION) private readonly db: PrismaClient) {}

  async findAll(folderId: string) {
    return await this.db.snippet.findMany({
      where: {
        folderId,
      },
    });
  }

  async create(userId: string, snippet: CreateSnippetSchema) {
    await this.db.snippet.create({
      data: {
        name: snippet.name,
        folderId: snippet.folderId!,
        description: snippet.description,
        userId,
      },
    });
  }
}
