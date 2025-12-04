import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .ui-badge {
      display: inline-flex;
      align-items: center;
      font-weight: 500;
      border-radius: 9999px;
    }

    .ui-badge--sm {
      padding: 0.125rem 0.5rem;
      font-size: 0.75rem;
    }

    .ui-badge--md {
      padding: 0.25rem 0.625rem;
      font-size: 0.875rem;
    }

    .ui-badge--lg {
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
    }

    .ui-badge--default {
      background-color: #e5e7eb;
      color: #374151;
    }

    .ui-badge--success {
      background-color: #d1fae5;
      color: #065f46;
    }

    .ui-badge--warning {
      background-color: #fef3c7;
      color: #92400e;
    }

    .ui-badge--danger {
      background-color: #fee2e2;
      color: #991b1b;
    }

    .ui-badge--info {
      background-color: #dbeafe;
      color: #1e40af;
    }
  `]
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';

  get badgeClasses(): string {
    return `ui-badge ui-badge--${this.variant} ui-badge--${this.size}`;
  }
}
