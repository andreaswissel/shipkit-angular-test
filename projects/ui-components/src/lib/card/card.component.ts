import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ui-card" [class.ui-card--hoverable]="hoverable">
      <div *ngIf="title || subtitle" class="ui-card__header">
        <h3 *ngIf="title" class="ui-card__title">{{ title }}</h3>
        <p *ngIf="subtitle" class="ui-card__subtitle">{{ subtitle }}</p>
      </div>
      <div class="ui-card__body">
        <ng-content></ng-content>
      </div>
      <div *ngIf="hasFooter" class="ui-card__footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .ui-card {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }

    .ui-card--hoverable:hover {
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }

    .ui-card__header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .ui-card__title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
    }

    .ui-card__subtitle {
      margin: 0.25rem 0 0;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .ui-card__body {
      padding: 1.5rem;
    }

    .ui-card__footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() hoverable = false;
  @Input() hasFooter = false;
}
