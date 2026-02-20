import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/auth.guard';
import { Project } from '../generated/prisma/client';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

/**
 * Transforms Prisma camelCase output to snake_case API format
 * to maintain backward compatibility with the Angular frontend.
 */
function toApiFormat(project: Project) {
  return {
    id: project.id,
    name: project.name,
    short_description: project.shortDescription,
    long_description: project.longDescription,
    url: project.url,
    github_url: project.githubUrl,
    case_study_url: project.caseStudyUrl,
    thumbnail: project.thumbnail,
    images: project.images,
    tags: project.tags,
    status: project.status,
    is_featured: project.isFeatured,
    display_order: project.displayOrder,
    created_at: project.createdAt,
    updated_at: project.updatedAt,
  };
}

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    const projects = await this.projectsService.findAll();
    return { success: true, data: projects.map(toApiFormat) };
  }

  @Get('featured')
  async findFeatured() {
    const projects = await this.projectsService.findFeatured();
    return { success: true, data: projects.map(toApiFormat) };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectsService.findOne(id);
    return { success: true, data: toApiFormat(project) };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateProjectDto) {
    const project = await this.projectsService.create(dto);
    return { success: true, data: toApiFormat(project) };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectDto) {
    const project = await this.projectsService.update(id, dto);
    return { success: true, data: toApiFormat(project) };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }
}
