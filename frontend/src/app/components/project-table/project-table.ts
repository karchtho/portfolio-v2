// project-table.ts
import { ChangeDetectionStrategy,Component, computed, inject,signal } from '@angular/core';

import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { Button } from "../button/button";
import { StatusBadge } from "../status-badge/status-badge";

type SortColumn = 'name' | 'status' | 'display_order' | 'updated_at';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.html',
  styleUrl: './project-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'project-table-wrapper' },
  imports: [Button, StatusBadge],
})
export class ProjectTable {
  private projectsService = inject(ProjectsService);

  // State signals
  protected sortColumn = signal<SortColumn>('display_order');
  protected sortDirection = signal<SortDirection>('asc');

  // Data signals
  protected projects = this.projectsService.projects;
  protected loading = this.projectsService.loading;
  protected error = this.projectsService.error;

  // Computed sorted projects
  protected sortedProjects = computed(() => {
    const projects = [...this.projects()];
    const column = this.sortColumn();
    const direction = this.sortDirection();

    return projects.sort((a, b) => {
      let comparison = 0;

      switch (column) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'display_order':
          comparison = a.display_order - b.display_order;
          break;
        case 'updated_at':
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  });

  constructor() {
    this.projectsService.loadProjects();
  }

  // Sort handler
  protected onSort(column: SortColumn): void {
    if (this.sortColumn() === column) {
      // Toggle direction if same column
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  // Action handlers
  protected onEdit(project: Project): void {
    // TODO: Navigate to edit page or open modal
    console.log('Edit project:', project.id);
  }

  protected onDelete(project: Project): void {
    if (confirm(`Delete "${project.name}"?`)) {
      // TODO: Implement delete via ProjectsService
      console.log('Delete project:', project.id);
    }
  }

  // Utility for relative dates
  protected getRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }
}
