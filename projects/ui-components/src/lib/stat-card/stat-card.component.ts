import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

export type TrendDirection = 'up' | 'down' | 'neutral';

@Component({
  selector: 'ui-stat-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <ui-card [hoverable]="true">
      <div class="ui-stat-card">
        <div class="ui-stat-card__header">
          <span class="ui-stat-card__label">{{ label }}</span>
          <span *ngIf="icon" class="ui-stat-card__icon">{{ icon }}</span>
        </div>
        <div class="ui-stat-card__value">{{ value }}</div>
        <div *ngIf="trend !== undefined" class="ui-stat-card__trend" [class]="trendClasses">
          <span class="ui-stat-card__trend-icon">{{ trendIcon }}</span>
          <span>{{ trend }}%</span>
          <span *ngIf="trendLabel" class="ui-stat-card__trend-label">{{ trendLabel }}</span>
        </div>
      </div>
    </ui-card>
  `,
  styles: [`
    .ui-stat-card {
      min-width: 200px;
    }

    .ui-stat-card__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }

    .ui-stat-card__label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
    }

    .ui-stat-card__icon {
      font-size: 1.25rem;
    }

    .ui-stat-card__value {
      font-size: 1.875rem;
      font-weight: 700;
      color: #111827;
      line-height: 1.2;
    }

    .ui-stat-card__trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .ui-stat-card__trend--up {
      color: #10b981;
    }

    .ui-stat-card__trend--down {
      color: #ef4444;
    }

    .ui-stat-card__trend--neutral {
      color: #6b7280;
    }

    .ui-stat-card__trend-label {
      color: #6b7280;
      font-weight: 400;
    }
  `]
})
export class StatCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() icon?: string;
  @Input() trend?: number;
  @Input() trendLabel?: string;

  get trendDirection(): TrendDirection {
    if (this.trend === undefined || this.trend === 0) return 'neutral';
    return this.trend > 0 ? 'up' : 'down';
  }

  get trendClasses(): string {
    return `ui-stat-card__trend--${this.trendDirection}`;
  }

  get trendIcon(): string {
    if (this.trendDirection === 'up') return '↑';
    if (this.trendDirection === 'down') return '↓';
    return '→';
  }
}
