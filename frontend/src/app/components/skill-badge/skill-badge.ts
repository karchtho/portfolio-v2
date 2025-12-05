import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skill-badge',
  imports: [],
  template: `
  <code class="skil-badge">{{label()}}</code>
  `,
  // styleUrl: './skill-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillBadge {
  label = input.required<string>();
}
