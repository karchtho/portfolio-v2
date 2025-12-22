import { ChangeDetectionStrategy, Component, input } from '@angular/core';

  /**
   * ErrorMessage - Atomic Component
   *
   * Displays validation or API error messages with accessibility support
   *
   * Features:
   * - ARIA live region for screen reader announcements
   * - Theme-aware error styling (--danger color)
   * - Icon + text layout
   * - Supports custom ID for aria-describedby
   *
   * Usage:
   * ```html
   * <app-error-message
   *   message="This field is required"
   *   [id]="'username-error'"
   * />
   * ```
   */
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'error-message-wrapper'
  }
})
export class ErrorMessage {
  /**
   *  Error message text to display
   */
  message = input.required<string>();

  /**
   * Optionnal ID for aria-describedny association with input
   */
  id = input<string>();
}

