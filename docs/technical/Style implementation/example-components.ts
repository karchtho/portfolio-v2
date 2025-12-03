// =============================================================================
// EXAMPLE COMPONENTS
// =============================================================================
// Various examples showing how to use the theme system effectively
// =============================================================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

// =============================================================================
// EXAMPLE 1: Card Component with Hover States
// =============================================================================

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="project-card">
      <div class="card-image">
        <img [src]="imageSrc" [alt]="title">
        <span class="badge" [class.featured]="featured">
          {{ featured ? 'Featured' : 'Project' }}
        </span>
      </div>
      
      <div class="card-content">
        <h3 class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
        
        <div class="tags">
          <span *ngFor="let tag of tags" class="tag">{{ tag }}</span>
        </div>
        
        <div class="card-actions">
          <button class="btn-primary">View Project</button>
          <button class="btn-secondary">GitHub</button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .project-card {
      background: var(--surface);
      border: 1px solid var(--border-default);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-sm);

      &:hover {
        border-color: var(--border-interactive);
        box-shadow: var(--shadow-lg);
        transform: translateY(-4px);
      }
    }

    .card-image {
      position: relative;
      height: 200px;
      background: var(--bg-tertiary);
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: var(--surface);
        color: var(--text-primary);
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        backdrop-filter: blur(10px);

        &.featured {
          background: var(--primary);
          color: var(--text-on-primary);
        }
      }
    }

    .card-content {
      padding: 1.5rem;
    }

    .title {
      color: var(--text-primary);
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .description {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .tag {
      background: var(--primary-alpha-10);
      color: var(--primary);
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .card-actions {
      display: flex;
      gap: 0.75rem;
    }

    .btn-primary {
      flex: 1;
      background: var(--primary);
      color: var(--text-on-primary);
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      
      &:hover {
        background: var(--primary-hover);
      }
    }

    .btn-secondary {
      background: var(--surface-hover);
      color: var(--text-primary);
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      border: 1px solid var(--border-default);
      
      &:hover {
        background: var(--surface-active);
        border-color: var(--border-strong);
      }
    }
  `]
})
export class ProjectCardComponent {
  title = 'MCP Server';
  description = 'A powerful Model Context Protocol server implementation';
  imageSrc = 'https://via.placeholder.com/400x200';
  featured = true;
  tags = ['TypeScript', 'Node.js', 'API'];
}

// =============================================================================
// EXAMPLE 2: Form with Validation States
// =============================================================================

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <form class="contact-form">
      <div class="form-group" [class.error]="emailError">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="your@email.com"
          [(ngModel)]="email"
          (blur)="validateEmail()"
        >
        <span *ngIf="emailError" class="error-message">
          {{ emailError }}
        </span>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          id="message"
          rows="5"
          placeholder="Your message..."
          [(ngModel)]="message"
        ></textarea>
      </div>

      <button type="submit" class="submit-btn" [disabled]="!isValid()">
        Send Message
      </button>
    </form>
  `,
  styles: [`
    .contact-form {
      background: var(--surface);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid var(--border-default);
    }

    .form-group {
      margin-bottom: 1.5rem;

      &.error {
        input, textarea {
          border-color: var(--error);
        }
      }
    }

    label {
      display: block;
      color: var(--text-primary);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    input,
    textarea {
      width: 100%;
      background: var(--bg-primary);
      color: var(--text-primary);
      border: 1px solid var(--border-default);
      padding: 0.75rem 1rem;
      border-radius: 6px;
      transition: all 0.2s ease;

      &::placeholder {
        color: var(--text-tertiary);
      }

      &:hover {
        border-color: var(--border-interactive);
      }

      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: var(--focus-ring);
      }
    }

    .error-message {
      display: block;
      color: var(--error);
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .submit-btn {
      width: 100%;
      background: var(--primary);
      color: var(--text-on-primary);
      padding: 1rem;
      border-radius: 6px;
      font-weight: 600;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background: var(--primary-hover);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  `]
})
export class ContactFormComponent {
  email = '';
  message = '';
  emailError = '';

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailRegex.test(this.email) 
      ? 'Please enter a valid email address' 
      : '';
  }

  isValid(): boolean {
    return this.email && !this.emailError && this.message.length > 0;
  }
}

// =============================================================================
// EXAMPLE 3: Navigation with Active States
// =============================================================================

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navigation">
      <div class="nav-brand">
        <span class="logo">{{ brandName }}</span>
      </div>

      <ul class="nav-links">
        <li *ngFor="let item of navItems">
          <a
            [class.active]="item.path === currentPath"
            [href]="item.path"
            (click)="setActive(item.path, $event)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <app-theme-toggle></app-theme-toggle>
    </nav>
  `,
  styles: [`
    .navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: var(--surface);
      border-bottom: 1px solid var(--border-default);
      box-shadow: var(--shadow-sm);
    }

    .nav-brand {
      .logo {
        color: var(--primary);
        font-size: 1.5rem;
        font-weight: 700;
      }
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;

      a {
        position: relative;
        color: var(--text-secondary);
        font-weight: 500;
        transition: color 0.2s ease;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
        }

        &:hover {
          color: var(--text-primary);
        }

        &.active {
          color: var(--primary);

          &::after {
            width: 100%;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .navigation {
        flex-direction: column;
        gap: 1rem;
      }

      .nav-links {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  `]
})
export class NavigationComponent {
  brandName = 'Portfolio';
  currentPath = '/';
  
  navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  setActive(path: string, event: Event): void {
    event.preventDefault();
    this.currentPath = path;
  }
}

// =============================================================================
// EXAMPLE 4: Alert/Toast Component with Semantic Colors
// =============================================================================

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert" [class]="type">
      <span class="icon">{{ getIcon() }}</span>
      <div class="content">
        <strong class="title">{{ title }}</strong>
        <p class="message">{{ message }}</p>
      </div>
      <button class="close-btn" (click)="onClose()">×</button>
    </div>
  `,
  styles: [`
    .alert {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid;
      
      .icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .content {
        flex: 1;
      }

      .title {
        display: block;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      .message {
        font-size: 0.875rem;
        margin: 0;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 1;
        }
      }

      // Success variant
      &.success {
        background: var(--success-alpha-10);
        border-color: var(--success);
        color: var(--success);

        .title, .message {
          color: var(--success);
        }
      }

      // Warning variant
      &.warning {
        background: var(--warning-alpha-10);
        border-color: var(--warning);
        color: var(--warning);

        .title, .message {
          color: var(--warning);
        }
      }

      // Error variant
      &.error {
        background: var(--error-alpha-10);
        border-color: var(--error);
        color: var(--error);

        .title, .message {
          color: var(--error);
        }
      }

      // Info variant
      &.info {
        background: var(--info-alpha-10);
        border-color: var(--info);
        color: var(--info);

        .title, .message {
          color: var(--info);
        }
      }
    }
  `]
})
export class AlertComponent {
  type: 'success' | 'warning' | 'error' | 'info' = 'info';
  title = '';
  message = '';

  getIcon(): string {
    const icons = {
      success: '✓',
      warning: '⚠',
      error: '✕',
      info: 'ℹ'
    };
    return icons[this.type];
  }

  onClose(): void {
    // Handle close
  }
}
