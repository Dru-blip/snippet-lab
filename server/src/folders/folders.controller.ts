import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FolderService } from './folders.service';
import { CreateFolderSchema } from './schema/createFolder.schema';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

@Controller('/folders')
export class FoldersController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  async getAll(@Session() session: UserSession) {
    const folders = await this.folderService.findAll(session.user.id);
    return { data: folders, err: null };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const folder = await this.folderService.findOne(id);
    return { data: folder, err: null };
  }

  @Post()
  async create(
    @Session() session: UserSession,
    @Body() data: CreateFolderSchema,
  ) {
    const folder = await this.folderService.create(session.user.id, data);
    return { data: folder, err: null };
  }
}
