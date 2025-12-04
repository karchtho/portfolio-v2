  /**
 * Project model matching the backend API structure
 */
  export interface Project {
    id: number;
    name: string;
    description: string;
    tags: string[];
    github_url?: string;
    demo_url?: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
  }

  /**
   * DTO for creating a new project
   */
  export interface CreateProjectDto {
    name: string;
    description: string;
    tags: string[];
    github_url?: string;
    demo_url?: string;
    image_url?: string;
  }

  /**
   * DTO for updating a project
   */
  export interface UpdateProjectDto {
    name?: string;
    description?: string;
    tags?: string[];
    github_url?: string;
    demo_url?: string;
    image_url?: string;
  }
