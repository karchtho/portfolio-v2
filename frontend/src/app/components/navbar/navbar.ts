import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ThemeService } from '../../services/theme.service';
import { Logo } from "../logo/logo";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, Logo],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  // Inject theme service
  private themeService = inject(ThemeService);

  // Computed signal
  isMobileMenuOpen = signal(false);
  isDark = computed(() => this.themeService.isDarkMode());

  // Navigation items
  navItems = [
    {label: 'Home', path: '/'},
    {label: 'Projects', path: '/projects'},
    {label: 'About', path: '/about'}
  ]

  // Toggle theme when slider is clicked
  onThemeToggle(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void  {
    this.isMobileMenuOpen.update(value => !value);
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }
}
