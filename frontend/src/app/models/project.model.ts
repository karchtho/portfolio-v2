  /**
 * Project model matching the backend API structure
 */
  export interface Project {
    id: number;
    name: string;
    short_description: string;
    long_description: string;
    tags: string[];
    thumbnail?: string; // 👈 AJOUTER
    images?: string[];
    url?: string;
    github_url?: string;
    case_study_url?: string; // NEW: Link to case study or blog post
    status: ProjectStatus; // UPDATED: 5-state enum
    is_featured: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
  }

    /**
   * Project lifecycle status enum
   */
  export enum ProjectStatus {
    IN_DEVELOPMENT = 'in_development',
    COMPLETED = 'completed',
    ACTIVELY_MAINTAINED = 'actively_maintained',
    DEPRECATED = 'deprecated',
    ARCHIVED = 'archived',
  }

    /**
   * Human-readable status labels for UI
   */
  export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
    [ProjectStatus.IN_DEVELOPMENT]: 'In Development',
    [ProjectStatus.COMPLETED]: 'Completed',
    [ProjectStatus.ACTIVELY_MAINTAINED]: 'Actively Maintained',
    [ProjectStatus.DEPRECATED]: 'Deprecated',
    [ProjectStatus.ARCHIVED]: 'Archived',
  };

    /**
   * Status badge variant mapping (for styling)
   */
  export const PROJECT_STATUS_VARIANTS: Record<ProjectStatus, string> = {
    [ProjectStatus.IN_DEVELOPMENT]: 'blue',
    [ProjectStatus.COMPLETED]: 'green',
    [ProjectStatus.ACTIVELY_MAINTAINED]: 'purple',
    [ProjectStatus.DEPRECATED]: 'orange',
    [ProjectStatus.ARCHIVED]: 'gray',
  };


  /**
   * DTO for creating a new project (admin form)
   */
  export interface CreateProjectDto {
    name: string;
    short_description: string;
    long_description: string;
    tags: string[];
    url?: string;
    github_url?: string;
    case_study_url?: string;
    status?: ProjectStatus;
    is_featured?: boolean;
    display_order?: number;
    // Note: thumbnail & images handled separately via upload flow
  }

  /**
   * DTO for updating a project (admin form)
   */
  export interface UpdateProjectDto {
    name?: string;
    short_description?: string;
    long_description?: string;
    tags?: string[];
    url?: string;
    github_url?: string;
    case_study_url?: string;
    status?: ProjectStatus;
    is_featured?: boolean;
    display_order?: number;
  }
