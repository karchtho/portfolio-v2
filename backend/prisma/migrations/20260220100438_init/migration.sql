-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('in_development', 'completed', 'actively_maintained', 'deprecated', 'archived');

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "short_description" VARCHAR(500) NOT NULL,
    "long_description" TEXT NOT NULL,
    "url" VARCHAR(500),
    "github_url" VARCHAR(500),
    "case_study_url" VARCHAR(500),
    "thumbnail" VARCHAR(500),
    "images" JSONB DEFAULT '[]',
    "tags" JSONB NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'in_development',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_status" ON "projects"("status");

-- CreateIndex
CREATE INDEX "idx_featured" ON "projects"("is_featured");

-- CreateIndex
CREATE INDEX "idx_display_order" ON "projects"("display_order");

-- CreateIndex
CREATE INDEX "idx_created_at" ON "projects"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
