import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { map, Observable } from 'rxjs';

import { Project } from '../models/project.model';

/**
 * API Response wrapper
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Projects Service
 *
 * Handles all API calls related to projects
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/projects';

  readonly projects = signal<Project[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  /**
   * Get all projects from API
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<ApiResponse<Project[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  /**
   * Get a single project by ID
   */
  getProject(id: number): Observable<Project> {
    return this.http.get<ApiResponse<Project>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Load projects and store in signal
   */
  loadProjects(): void {
    this.loading.set(true);
    this.error.set(null);

    this.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load projects');
        this.loading.set(false);
        console.error('Error loading projects:', err);
      }
    });
  }
}
