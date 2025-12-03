# OKLCH Theme System - Integration Guide

Complete theme system using OKLCH colors with relative color syntax for Angular 21.

## 📁 File Structure

```
src/
├── styles/
│   ├── _tokens.scss          # Base OKLCH color definitions
│   ├── _themes.scss          # Light/Dark themes with relative colors
│   └── styles.scss           # Main entry point (import in angular.json)
│
└── app/
    ├── services/
    │   └── theme.service.ts  # Theme management service
    └── components/
        └── theme-switcher.component.ts  # UI controls
```

## 🚀 Installation Steps

### 1. Copy the SCSS Files

Place these files in `src/styles/`:
- `_tokens.scss` - Base color tokens
- `_themes.scss` - Theme definitions
- `styles.scss` - Main stylesheet

### 2. Update angular.json

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles/styles.scss"  // ← Add this
            ]
          }
        }
      }
    }
  }
}
```

### 3. Add the Theme Service

Copy `theme.service.ts` to `src/app/services/`

The service will be automatically available via `providedIn: 'root'`.

### 4. Add Theme Switcher Components (Optional)

Copy `theme-switcher.component.ts` to `src/app/components/`

Import in your header/navbar:

```typescript
import { ThemeSwitcherComponent } from './components/theme-switcher.component';
// or
import { ThemeToggleComponent } from './components/theme-switcher.component';

@Component({
  imports: [ThemeSwitcherComponent, ThemeToggleComponent]
})
```

## 🎨 Usage Examples

### In TypeScript (Component)

```typescript
import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>My Portfolio</h1>
      <p>Current theme: {{ themeService.theme() }}</p>
      <p>Active mode: {{ themeService.activeTheme() }}</p>
      <button (click)="themeService.toggleTheme()">Toggle Theme</button>
    </header>
  `
})
export class HeaderComponent {
  constructor(public themeService: ThemeService) {}
}
```

### In SCSS (Component Styles)

```scss
// component.scss

.card {
  background: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;

  &:hover {
    background: var(--surface-hover);
    box-shadow: var(--shadow-lg);
  }
}

.button-primary {
  background: var(--primary);
  color: var(--text-on-primary);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-hover);
  }

  &:active {
    background: var(--primary-active);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

.badge-success {
  background: var(--success-light);
  color: var(--success);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.input-field {
  background: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  padding: 0.75rem 1rem;
  border-radius: 6px;

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

  &.error {
    border-color: var(--error);
    
    &:focus {
      box-shadow: var(--focus-ring-error);
    }
  }
}
```

## 📋 Available CSS Variables

### Brand Colors
```css
--primary              /* Main brand color */
--primary-hover        /* Hover state */
--primary-active       /* Active/pressed state */
--primary-light        /* Lighter variant */
--primary-alpha-10/20/30/50  /* With transparency */

--accent               /* Accent color */
--accent-hover
--accent-active
--accent-light
```

### Backgrounds
```css
--bg-primary           /* Main background */
--bg-secondary         /* Secondary background */
--bg-tertiary          /* Tertiary background */
```

### Surfaces
```css
--surface              /* Card/panel background */
--surface-hover        /* Hover state */
--surface-active       /* Active state */
--surface-elevated     /* Elevated surfaces (dropdowns, modals) */
```

### Text
```css
--text-primary         /* Main text */
--text-secondary       /* Secondary text */
--text-tertiary        /* Tertiary text */
--text-disabled        /* Disabled state */
--text-on-primary      /* Text on primary color */
--text-on-accent       /* Text on accent color */
```

### Links
```css
--link                 /* Link color */
--link-hover           /* Link hover */
--link-visited         /* Visited link */
```

### Borders
```css
--border-subtle        /* Subtle border */
--border-default       /* Default border */
--border-strong        /* Strong border */
--border-interactive   /* Interactive elements */
```

### Semantic Colors
```css
--success / --success-light / --success-alpha-10
--warning / --warning-light / --warning-alpha-10
--error / --error-light / --error-alpha-10
--info / --info-light / --info-alpha-10
```

### Shadows
```css
--shadow-sm            /* Small shadow */
--shadow-md            /* Medium shadow */
--shadow-lg            /* Large shadow */
--shadow-xl            /* Extra large shadow */
```

### Focus
```css
--focus-ring           /* Default focus ring */
--focus-ring-error     /* Error focus ring */
```

## 🎯 Color Palette Reference

### Light Theme
- **Primary Blue**: `#2563EB` → `oklch(0.461 0.534 292.8)`
- **Accent Red**: `#FF6B35` → `oklch(0.634 0.519 46.5)`
- **Background 1**: `#FFFFFF` → `oklch(1 0 0)`
- **Background 2**: `#F5F5F5` → `oklch(0.965 0 158.2)`
- **Surface**: `#F8FAFC` → `oklch(0.982 0.008 255.6)`
- **Text Primary**: `#1E293B` → `oklch(0.164 0.087 274.7)`
- **Text Secondary**: `#64748B` → `oklch(0.483 0.097 268.7)`
- **Border**: `#E2E8F0` → `oklch(0.918 0.031 263.5)`

### Dark Theme
- **Primary Blue**: `#3B82F6` → `oklch(0.556 0.445 285.2)`
- **Accent Red**: `#FF8A65` → `oklch(0.697 0.38 43.8)`
- **Background 1**: `#0F172A` → `oklch(0.08 0.096 283.3)`
- **Background 2**: `#0F0F0F` → `oklch(0.043 0 158.2)`
- **Surface**: `#1E293B` → `oklch(0.164 0.087 274.7)`
- **Text Primary**: `#F1F5F9` → `oklch(0.963 0.016 255.8)`
- **Text Secondary**: `#94A3B8` → `oklch(0.665 0.084 266.7)`
- **Border**: `#334155` → `oklch(0.271 0.092 270.5)`

## 🔧 Advanced Usage

### Creating Custom Variations

Use relative colors to create variations:

```scss
.custom-element {
  // Lighter version
  background: oklch(from var(--primary) calc(l + 0.15) c h);
  
  // Darker version
  background: oklch(from var(--primary) calc(l - 0.15) c h);
  
  // Less saturated
  background: oklch(from var(--primary) l calc(c * 0.5) h);
  
  // With transparency
  background: oklch(from var(--primary) l c h / 0.2);
  
  // Shifted hue
  background: oklch(from var(--primary) l c calc(h + 30));
}
```

### Programmatically Setting Theme

```typescript
// In component or service
constructor(private themeService: ThemeService) {
  // Set specific theme
  this.themeService.setTheme('dark');
  
  // Toggle between light/dark
  this.themeService.toggleTheme();
  
  // Check current theme
  console.log(this.themeService.theme());
  
  // Check if dark mode is active
  if (this.themeService.isDarkMode()) {
    // Do something
  }
}
```

### Reacting to Theme Changes

```typescript
import { effect } from '@angular/core';

constructor(private themeService: ThemeService) {
  effect(() => {
    const theme = this.themeService.theme();
    console.log('Theme changed to:', theme);
    // Update analytics, preferences, etc.
  });
}
```

## 🌟 Benefits of This Approach

1. **OKLCH Color Space**: Better perceptual uniformity than RGB/HSL
2. **Relative Colors**: Create variations without hardcoding values
3. **CSS Variables**: Instant theme switching, no JavaScript needed for colors
4. **Type-Safe**: TypeScript service with proper types
5. **Persistent**: User preference saved in localStorage
6. **Responsive**: Respects system preferences with 'auto' mode
7. **Maintainable**: Central color definitions, easy to update
8. **Accessible**: Proper contrast ratios maintained across themes

## 📚 Browser Support

- OKLCH colors: Chrome 111+, Safari 15.4+, Firefox 113+
- Relative colors: Chrome 119+, Safari 16.4+, Firefox 120+
- For older browsers, consider using a PostCSS plugin for fallbacks

## 🐛 Troubleshooting

### Colors not updating
- Ensure `styles.scss` is imported in `angular.json`
- Check that `ThemeService` is injected in your root component

### Theme not persisting
- Check localStorage permissions
- Verify `STORAGE_KEY` is accessible

### Colors look wrong
- Verify SCSS files are in `src/styles/`
- Check import order in `styles.scss`
- Clear browser cache

## 📖 Additional Resources

- [OKLCH Color Picker](https://oklch.com/)
- [MDN: Relative Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Relative_colors)
- [Angular Signals](https://angular.io/guide/signals)
