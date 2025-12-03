import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from './theme.service';

/**
 * Theme Switcher Component
 * 
 * Provides UI controls for switching between light, dark, and auto themes
 * Can be used in header, settings panel, or anywhere in the app
 */
@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-switcher">
      <button
        *ngFor="let option of themeOptions"
        [class.active]="themeService.theme() === option.value"
        [attr.aria-label]="'Switch to ' + option.label + ' theme'"
        [attr.aria-pressed]="themeService.theme() === option.value"
        (click)="setTheme(option.value)"
        class="theme-button"
      >
        <span class="icon">{{ option.icon }}</span>
        <span class="label">{{ option.label }}</span>
      </button>
    </div>
  `,
  styles: [`
    .theme-switcher {
      display: flex;
      gap: 0.5rem;
      padding: 0.25rem;
      background: var(--surface);
      border: 1px solid var(--border-default);
      border-radius: 8px;
    }

    .theme-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: transparent;
      color: var(--text-secondary);
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      cursor: pointer;

      .icon {
        font-size: 1.25rem;
      }

      .label {
        font-weight: 500;
      }

      &:hover {
        background: var(--surface-hover);
        color: var(--text-primary);
      }

      &.active {
        background: var(--primary);
        color: var(--text-on-primary);
      }

      &:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }
    }

    // Responsive: stack vertically on small screens
    @media (max-width: 640px) {
      .theme-switcher {
        flex-direction: column;
      }

      .theme-button {
        justify-content: flex-start;
      }
    }
  `]
})
export class ThemeSwitcherComponent {
  readonly themeOptions = [
    { value: 'light' as Theme, label: 'Light', icon: '☀️' },
    { value: 'dark' as Theme, label: 'Dark', icon: '🌙' },
    { value: 'auto' as Theme, label: 'Auto', icon: '💻' }
  ];

  constructor(public themeService: ThemeService) {}

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}

/**
 * Simple Toggle Button Component
 * 
 * Minimal toggle between light and dark modes
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="theme-toggle"
      [attr.aria-label]="'Switch to ' + (isDark() ? 'light' : 'dark') + ' theme'"
      (click)="themeService.toggleTheme()"
    >
      <span class="icon">{{ isDark() ? '☀️' : '🌙' }}</span>
    </button>
  `,
  styles: [`
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
      background: var(--surface);
      color: var(--text-primary);
      border: 1px solid var(--border-default);
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;

      .icon {
        font-size: 1.25rem;
        transition: transform 0.3s ease;
      }

      &:hover {
        background: var(--surface-hover);
        transform: scale(1.05);

        .icon {
          transform: rotate(20deg);
        }
      }

      &:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }
    }
  `]
})
export class ThemeToggleComponent {
  isDark = computed(() => this.themeService.isDarkMode());

  constructor(public themeService: ThemeService) {}
}
