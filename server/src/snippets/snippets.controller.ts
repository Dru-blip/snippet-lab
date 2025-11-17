import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { CreateSnippetSchema } from './schema/createSnippet.schema';

@Controller(':folderId/snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Get()
  async getAllSnippets(@Param('folderId') folderId: string) {
    const snippets = await this.snippetsService.findAll(folderId);
    return { data: snippets, err: null };
  }

  @Post()
  async createSnippet(
    @Session() session: UserSession,
    @Body() snippet: CreateSnippetSchema,
  ) {
    const createdSnippet = await this.snippetsService.create(
      session.user.id,
      snippet,
    );
    return { data: createdSnippet, err: null };
  }
}
