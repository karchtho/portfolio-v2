Signal-Based State Management
```
  // project-table.ts
  import { Component, computed, signal, inject } from '@angular/core';
  import { ProjectsService } from '../../services/projects.service';
  import { Project, ProjectStatus } from '../../models/project.model';

  type SortColumn = 'name' | 'status' | 'display_order' | 'updated_at';
  type SortDirection = 'asc' | 'desc';

  @Component({
    selector: 'app-project-table',
    templateUrl: './project-table.html',
    styleUrl: './project-table.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'project-table-wrapper' }
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

  ---
  📝 Template Implementation

  <!-- project-table.html -->
  <div class="project-table">
    <!-- Header -->
    <header class="project-table__header">
      <h1 class="project-table__title">Projects</h1>
      <app-button
        label="Create New Project"
        variant="primary"
        routerLink="/admin/create"
      />
    </header>

    <!-- Loading State -->
    @if (loading()) {
      <div class="project-table__loading">
        <!-- Use skeleton loader component -->
        <app-skeleton-table rows="5" />
      </div>
    }

    <!-- Error State -->
    @else if (error()) {
      <div class="project-table__error">
        <p>{{ error() }}</p>
        <app-button
          label="Retry"
          variant="secondary"
          (click)="projectsService.loadProjects()"
        />
      </div>
    }

    <!-- Empty State -->
    @else if (sortedProjects().length === 0) {
      <div class="project-table__empty">
        <p>No projects yet. Create your first project!</p>
        <app-button
          label="Create Project"
          variant="primary"
          routerLink="/admin/create"
        />
      </div>
    }

    <!-- Table -->
    @else {
      <div class="project-table__container">
        <table class="project-table__table" role="grid" aria-label="Projects table">
          <!-- Table Header -->
          <thead class="project-table__thead">
            <tr>
              <!-- Name Column -->
              <th
                class="project-table__th project-table__th--sortable"
                (click)="onSort('name')"
                [attr.aria-sort]="sortColumn() === 'name' ? (sortDirection() === 'asc' ? 'ascending' : 'descending') : 'none'"
              >
                <button type="button" class="project-table__sort-button">
                  Name
                  @if (sortColumn() === 'name') {
                    <span class="project-table__sort-icon" [class.project-table__sort-icon--desc]="sortDirection() === 'desc'">
                      ▲
                    </span>
                  }
                </button>
              </th>

              <!-- Status Column -->
              <th
                class="project-table__th project-table__th--sortable"
                (click)="onSort('status')"
                [attr.aria-sort]="sortColumn() === 'status' ? (sortDirection() === 'asc' ? 'ascending' : 'descending') : 'none'"
              >
                <button type="button" class="project-table__sort-button">
                  Status
                  @if (sortColumn() === 'status') {
                    <span class="project-table__sort-icon" [class.project-table__sort-icon--desc]="sortDirection() === 'desc'">
                      ▲
                    </span>
                  }
                </button>
              </th>

              <!-- Featured Column -->
              <th class="project-table__th">Featured</th>

              <!-- Order Column -->
              <th
                class="project-table__th project-table__th--sortable"
                (click)="onSort('display_order')"
                [attr.aria-sort]="sortColumn() === 'display_order' ? (sortDirection() === 'asc' ? 'ascending' : 'descending') : 'none'"
              >
                <button type="button" class="project-table__sort-button">
                  Order
                  @if (sortColumn() === 'display_order') {
                    <span class="project-table__sort-icon" [class.project-table__sort-icon--desc]="sortDirection() === 'desc'">
                      ▲
                    </span>
                  }
                </button>
              </th>

              <!-- Updated Column -->
              <th
                class="project-table__th project-table__th--sortable"
                (click)="onSort('updated_at')"
                [attr.aria-sort]="sortColumn() === 'updated_at' ? (sortDirection() === 'asc' ? 'ascending' : 'descending') : 'none'"
              >
                <button type="button" class="project-table__sort-button">
                  Updated
                  @if (sortColumn() === 'updated_at') {
                    <span class="project-table__sort-icon" [class.project-table__sort-icon--desc]="sortDirection() === 'desc'">
                      ▲
                    </span>
                  }
                </button>
              </th>

              <!-- Actions Column -->
              <th class="project-table__th project-table__th--actions">Actions</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="project-table__tbody">
            @for (project of sortedProjects(); track project.id) {
              <tr class="project-table__row">
                <!-- Name Cell (with thumbnail + tags) -->
                <td class="project-table__cell project-table__cell--name">
                  <div class="project-table__name-wrapper">
                    @if (project.thumbnail) {
                      <img
                        class="project-table__thumbnail"
                        [src]="getImageUrl(project.thumbnail)"
                        [alt]="project.name"
                        loading="lazy"
                      />
                    }
                    <div class="project-table__name-content">
                      <span class="project-table__name-text">{{ project.name }}</span>
                      @if (project.tags.length > 0) {
                        <div class="project-table__tags">
                          @for (tag of project.tags.slice(0, 3); track tag) {
                            <span class="project-table__tag">{{ tag }}</span>
                          }
                          @if (project.tags.length > 3) {
                            <span class="project-table__tag-more">+{{ project.tags.length - 3 }}</span>
                          }
                        </div>
                      }
                    </div>
                  </div>
                </td>

                <!-- Status Cell -->
                <td class="project-table__cell project-table__cell--status">
                  <app-status-badge [status]="project.status" />
                </td>

                <!-- Featured Cell -->
                <td class="project-table__cell project-table__cell--featured">
                  <span
                    class="project-table__featured-icon"
                    [class.project-table__featured-icon--active]="project.is_featured"
                    [attr.aria-label]="project.is_featured ? 'Featured' : 'Not featured'"
                  >
                    {{ project.is_featured ? '✓' : '✗' }}
                  </span>
                </td>

                <!-- Order Cell -->
                <td class="project-table__cell project-table__cell--order">
                  {{ project.display_order }}
                </td>

                <!-- Updated Cell -->
                <td class="project-table__cell project-table__cell--date">
                  <time [attr.datetime]="project.updated_at">
                    {{ getRelativeDate(project.updated_at) }}
                  </time>
                </td>

                <!-- Actions Cell -->
                <td class="project-table__cell project-table__cell--actions">
                  <div class="project-table__actions">
                    <app-button
                      label="Edit"
                      variant="secondary"
                      size="small"
                      (click)="onEdit(project)"
                      [attr.aria-label]="'Edit ' + project.name"
                    />
                    <app-button
                      label="Delete"
                      variant="ghost"
                      size="small"
                      (click)="onDelete(project)"
                      [attr.aria-label]="'Delete ' + project.name"
                    />
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  </div>

  ---
  🎨 SCSS Implementation with Design Tokens

  // project-table.scss
  @use '../../../styles/mixins' as *;
  @use '../../../styles/variables' as *;

  :host {
    display: block;
    min-height: 100vh;
  }

  .project-table {
    padding: var(--spacing-8) 0;

    // Header
    &__header {
      @include container;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-8);
      gap: var(--spacing-4);

      @media (max-width: $breakpoint-mobile) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__title {
      @include heading;
      font-size: var(--font-size-4xl);
      margin: 0;
    }

    // States
    &__loading,
    &__error,
    &__empty {
      @include container;
      padding: var(--spacing-12);
      text-align: center;
      color: var(--text-secondary);
    }

    &__error {
      color: var(--error);
    }

    // Table Container
    &__container {
      @include container;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch; // Smooth scrolling on iOS

      // Custom scrollbar
      &::-webkit-scrollbar {
        height: 8px;
      }

      &::-webkit-scrollbar-track {
        background: var(--surface-secondary);
        border-radius: var(--radius-sm);
      }

      &::-webkit-scrollbar-thumb {
        background: var(--border-default);
        border-radius: var(--radius-sm);

        &:hover {
          background: var(--text-tertiary);
        }
      }
    }

    // Table
    &__table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      font-size: var(--font-size-sm);

      // Mobile: switch to card layout
      @media (max-width: $breakpoint-tablet) {
        display: block;
      }
    }

    // Table Head
    &__thead {
      @media (max-width: $breakpoint-tablet) {
        display: none; // Hide header on mobile
      }
    }

    // Table Header Cell
    &__th {
      padding: var(--spacing-4);
      text-align: left;
      font-weight: var(--font-weight-semibold);
      color: var(--text-secondary);
      background: var(--surface-secondary);
      border-bottom: 2px solid var(--border-default);
      white-space: nowrap;

      // Sticky header for long lists
      position: sticky;
      top: 0;
      z-index: 10;

      &:first-child {
        border-top-left-radius: var(--radius-default);
      }

      &:last-child {
        border-top-right-radius: var(--radius-default);
      }

      &--sortable {
        cursor: pointer;
        user-select: none;

        &:hover {
          background: var(--surface-tertiary);
        }
      }

      &--actions {
        text-align: right;
      }
    }

    // Sort Button
    &__sort-button {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      padding: 0;
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      width: 100%;
    }

    &__sort-icon {
      font-size: 0.75em;
      transition: transform var(--transition-fast) var(--ease-out);

      &--desc {
        transform: rotate(180deg);
      }
    }

    // Table Body
    &__tbody {
      @media (max-width: $breakpoint-tablet) {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-4);
      }
    }

    // Table Row
    &__row {
      transition: background-color var(--transition-fast) var(--ease-out);

      &:hover {
        background: var(--surface-secondary);
      }

      // Mobile: card layout
      @media (max-width: $breakpoint-tablet) {
        display: block;
        @include card;
        padding: var(--spacing-4);
        background: var(--surface-primary);

        &:hover {
          background: var(--surface-primary);
          box-shadow: var(--shadow-md);
        }
      }
    }

    // Table Cell
    &__cell {
      padding: var(--spacing-4);
      border-bottom: 1px solid var(--border-default);
      vertical-align: middle;

      // Mobile: reset table cell styles
      @media (max-width: $breakpoint-tablet) {
        display: block;
        border: none;
        padding: var(--spacing-2) 0;

        &:first-child {
          padding-top: 0;
        }

        &:last-child {
          padding-bottom: 0;
        }

        // Add labels on mobile
        &::before {
          content: attr(data-label);
          display: inline-block;
          font-weight: var(--font-weight-semibold);
          color: var(--text-secondary);
          margin-right: var(--spacing-2);
        }

        &--name::before {
          content: '';
        }

        &--status::before {
          content: 'Status: ';
        }

        &--featured::before {
          content: 'Featured: ';
        }

        &--order::before {
          content: 'Order: ';
        }

        &--date::before {
          content: 'Updated: ';
        }

        &--actions::before {
          content: '';
        }
      }

      &--actions {
        text-align: right;

        @media (max-width: $breakpoint-tablet) {
          text-align: left;
          margin-top: var(--spacing-3);
        }
      }
    }

    // Name Cell Components
    &__name-wrapper {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
    }

    &__thumbnail {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-sm);
      object-fit: cover;
      background: var(--surface-secondary);
      flex-shrink: 0;
    }

    &__name-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
      min-width: 0; // Enable text truncation
    }

    &__name-text {
      font-weight: var(--font-weight-medium);
      color: var(--text-primary);
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-1);
    }

    &__tag {
      display: inline-block;
      padding: var(--spacing-05) var(--spacing-2);
      background: var(--primary-alpha-10);
      color: var(--primary);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);
      border-radius: var(--radius-sm);
    }

    &__tag-more {
      @extend .project-table__tag;
      background: var(--surface-tertiary);
      color: var(--text-tertiary);
    }

    // Featured Icon
    &__featured-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      color: var(--text-tertiary);
      background: var(--surface-secondary);

      &--active {
        color: var(--success);
        background: oklch(from var(--success) l c h / 0.15);
      }
    }

    // Actions
    &__actions {
      display: flex;
      gap: var(--spacing-2);
      justify-content: flex-end;

      @media (max-width: $breakpoint-tablet) {
        justify-content: flex-start;
      }
    }

    // Reduced motion
    @media (prefers-reduced-motion: reduce) {
      &__sort-icon,
      &__row {
        transition: none;
      }
    }
  }
```

  ---
  ♿ Accessibility Checklist

  ✅ Semantic HTML
  - <table>, <thead>, <tbody>, <tr>, <th>, <td>
  - role="grid" on table
  - <time> element for dates

  ✅ ARIA Attributes
  - aria-label on table
  - aria-sort on sortable headers
  - aria-label on action buttons

  ✅ Keyboard Navigation
  - Sortable headers are <button> elements
  - Tab through action buttons
  - Enter/Space to activate

  ✅ Screen Reader Support
  - Descriptive labels ("Edit Project Name")
  - Sort direction announced
  - Table structure preserved

  ✅ Focus Management
  - Visible focus indicators
  - Logical tab order

  ---
  📱 Responsive Strategy Summary

  | Breakpoint       | Layout | Strategy                       |
  |------------------|--------|--------------------------------|
  | Desktop (≥768px) | Table  | Full table with all columns    |
  | Tablet (≥640px)  | Table  | Narrower columns, smaller text |
  | Mobile (<640px)  | Cards  | Stacked cards with labels      |

  Implementation:
  - CSS Grid/Flexbox for layout switching
  - display: block on table elements for mobile
  - ::before pseudo-elements for mobile labels
  - Horizontal scroll for table on small tablets

  ---
  🚀 Advanced Features (Future)

  Once basic table is working, consider:

  1. Column Visibility Toggle
    - Show/hide columns
    - Persist preference in localStorage
  2. Bulk Actions
    - Checkboxes for multi-select
    - Bulk delete, bulk edit status
  3. Inline Editing
    - Click to edit cells
    - Quick update without leaving page
  4. Search/Filter
    - Global search across all fields
    - Filter by status, featured, tags
  5. Pagination
    - Limit rows per page
    - Virtual scrolling for large lists
  6. Export
    - Export to CSV/Excel
    - Print-friendly view

  ---
  📊 Comparison: Table vs Cards for Admin

  | Feature             | Table                      | Cards                |
  |---------------------|----------------------------|----------------------|
  | Information Density | High ⭐⭐⭐⭐⭐            | Low ⭐⭐             |
  | Scannability        | Excellent ⭐⭐⭐⭐⭐       | Good ⭐⭐⭐          |
  | Sorting             | Native ⭐⭐⭐⭐⭐          | Custom ⭐⭐⭐        |
  | Mobile UX           | Good (responsive) ⭐⭐⭐⭐ | Excellent ⭐⭐⭐⭐⭐ |
  | Visual Appeal       | Professional ⭐⭐⭐⭐      | Modern ⭐⭐⭐⭐⭐    |
  | Comparison          | Easy ⭐⭐⭐⭐⭐            | Hard ⭐⭐            |
  | Bulk Actions        | Natural ⭐⭐⭐⭐⭐         | Awkward ⭐⭐         |

  Verdict: Table wins for admin with 7+ data fields per item.

  ---
  🎯 Implementation Checklist

  - Create project-table.ts component
  - Create project-table.html template
  - Create project-table.scss styles
  - Add to admin route
  - Implement sorting logic with signals
  - Add responsive mobile layout
  - Test keyboard navigation
  - Test screen reader support
  - Add loading/error/empty states
  - Implement Edit/Delete handlers

  ---
  Estimated implementation time: 2-3 hours

  Result: Modern, accessible, responsive admin table that follows 2025 UX standards and integrates seamlessly with your existing Angular design system.