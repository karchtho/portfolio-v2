import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  findFeatured() {
    return this.prisma.project.findMany({
      where: {
        isFeatured: true,
        status: { in: ['completed', 'actively_maintained'] },
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return project;
  }

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        shortDescription: dto.short_description,
        longDescription: dto.long_description,
        tags: dto.tags,
        url: dto.url ?? null,
        githubUrl: dto.github_url ?? null,
        caseStudyUrl: dto.case_study_url ?? null,
        thumbnail: dto.thumbnail ?? null,
        images: dto.images ?? [],
        status: dto.status ?? 'in_development',
        isFeatured: dto.is_featured ?? false,
        displayOrder: dto.display_order ?? 0,
      },
    });
  }

  async update(id: number, dto: UpdateProjectDto) {
    await this.findOne(id); // throws NotFoundException if not found

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.short_description !== undefined) data.shortDescription = dto.short_description;
    if (dto.long_description !== undefined) data.longDescription = dto.long_description;
    if (dto.tags !== undefined) data.tags = dto.tags;
    if (dto.url !== undefined) data.url = dto.url;
    if (dto.github_url !== undefined) data.githubUrl = dto.github_url;
    if (dto.case_study_url !== undefined) data.caseStudyUrl = dto.case_study_url;
    if (dto.thumbnail !== undefined) data.thumbnail = dto.thumbnail;
    if (dto.images !== undefined) data.images = dto.images;
    if (dto.status !== undefined) data.status = dto.status;
    if (dto.is_featured !== undefined) data.isFeatured = dto.is_featured;
    if (dto.display_order !== undefined) data.displayOrder = dto.display_order;

    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // throws NotFoundException if not found
    await this.prisma.project.delete({ where: { id } });
    return { success: true, message: `Project #${id} deleted` };
  }
}
