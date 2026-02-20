import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';

export enum ProjectStatus {
  IN_DEVELOPMENT = 'in_development',
  COMPLETED = 'completed',
  ACTIVELY_MAINTAINED = 'actively_maintained',
  DEPRECATED = 'deprecated',
  ARCHIVED = 'archived',
}

const IMAGE_PATH_REGEX = /^uploads\/projects\/[\w-]+\.(webp|jpg|jpeg|png|gif|avif)$/;

export class CreateProjectDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name!: string;

  @IsString()
  @MinLength(20)
  @MaxLength(500)
  short_description!: string;

  @IsString()
  @MinLength(50)
  @MaxLength(10000)
  long_description!: string;

  @IsArray()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @MaxLength(50, { each: true })
  tags!: string[];

  @IsOptional()
  @IsString()
  @MaxLength(500)
  url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  github_url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  case_study_url?: string;

  @IsOptional()
  @IsString()
  @Matches(IMAGE_PATH_REGEX)
  thumbnail?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Matches(IMAGE_PATH_REGEX, { each: true })
  images?: string[];

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(9999)
  display_order?: number;
}
