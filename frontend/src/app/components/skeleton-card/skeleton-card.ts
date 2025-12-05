import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  imports: [],
  templateUrl: './skeleton-card.html',
  styleUrl: './skeleton-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'skeleton-card'}
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SkeletonCard {}
