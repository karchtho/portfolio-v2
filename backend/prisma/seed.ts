import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

import { PrismaClient, ProjectStatus } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
    },
  });
  console.log('Admin user seeded');

  // Seed projects
  const projects = [
    {
      name: 'Portfolio',
      shortDescription:
        'A modern personal portfolio built with Angular and NestJS, deployed on a secured OVH VPS with Docker and Nginx reverse proxy.',
      longDescription:
        'A modern personal portfolio built with Angular and Node.js/Express, deployed on a secured OVH VPS with Docker and Nginx reverse proxy. This project marks my transition from PHP to a TypeScript-focused stack, with an emphasis on security-first infrastructure.',
      url: 'https://karcherthomas.com',
      githubUrl: 'https://github.com/karchtho/portfolio-v2',
      thumbnail: 'uploads/projects/portfolio-main.webp',
      images: [],
      tags: ['Angular', 'TypeScript', 'Node.js', 'Nginx', 'Express', 'PostgreSQL', 'Docker'],
      status: ProjectStatus.actively_maintained,
      isFeatured: true,
      displayOrder: 1,
    },
    {
      name: 'Snaposaurus',
      shortDescription:
        'A dinosaur safari photography game built in 72 hours with a 9-person team during a game jam.',
      longDescription:
        'A dinosaur safari photography game built in 72 hours with a 9-person team. My first Unity project. I worked on UI systems, gameplay mechanics, and team coordination.',
      url: 'https://yvalis-studio.itch.io/snaposaurus',
      githubUrl: 'https://github.com/Yvalis-Studio/Snaposaurus',
      thumbnail: 'uploads/projects/snaposaurus-main.webp',
      images: ['uploads/projects/snaposaurus-main.webp'],
      tags: ['Unity', 'C#', 'Game Jam', 'UI Design', 'Team Collaboration', 'Git'],
      status: ProjectStatus.completed,
      isFeatured: true,
      displayOrder: 2,
    },
    {
      name: 'MCP Course Repository System',
      shortDescription:
        'An educational course management system integrating Claude AI with MySQL through the Model Context Protocol.',
      longDescription:
        'An educational course management system that integrates Claude AI with a MySQL database through the Model Context Protocol (MCP). Enables AI-powered course search and management via multiple interfaces: MCP tools for Claude, Flask web UI, and REST API.',
      url: '',
      githubUrl: 'https://github.com/karchtho/mcp-test',
      thumbnail: 'uploads/projects/mcp-main.avif',
      images: ['uploads/projects/mcp-main.avif'],
      tags: ['Python', 'MCP', 'Flask', 'Asyncio', 'MySQL', 'Claude AI'],
      status: ProjectStatus.completed,
      isFeatured: true,
      displayOrder: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: projects.indexOf(project) + 1 },
      update: {},
      create: project,
    });
  }
  console.log(`${projects.length} projects seeded`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
