import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'ui-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ui-progress">
      <div class="ui-progress__header" *ngIf="label || showValue">
        <span *ngIf="label" class="ui-progress__label">{{ label }}</span>
        <span *ngIf="showValue" class="ui-progress__value">{{ value }}%</span>
      </div>
      <div class="ui-progress__track" [style.height.px]="height">
        <div
          [class]="barClasses"
          [style.width.%]="clampedValue"
          [class.ui-progress__bar--animated]="animated"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    .ui-progress {
      width: 100%;
    }

    .ui-progress__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.375rem;
    }

    .ui-progress__label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .ui-progress__value {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .ui-progress__track {
      width: 100%;
      background-color: #e5e7eb;
      border-radius: 9999px;
      overflow: hidden;
    }

    .ui-progress__bar {
      height: 100%;
      border-radius: 9999px;
      transition: width 0.3s ease;
    }

    .ui-progress__bar--default { background-color: #3b82f6; }
    .ui-progress__bar--success { background-color: #10b981; }
    .ui-progress__bar--warning { background-color: #f59e0b; }
    .ui-progress__bar--danger { background-color: #ef4444; }

    .ui-progress__bar--animated {
      background-image: linear-gradient(
        45deg,
        rgba(255,255,255,0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255,255,255,0.15) 50%,
        rgba(255,255,255,0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
      animation: progress-stripes 1s linear infinite;
    }

    @keyframes progress-stripes {
      0% { background-position: 1rem 0; }
      100% { background-position: 0 0; }
    }
  `]
})
export class ProgressComponent {
  @Input() value = 0;
  @Input() variant: ProgressVariant = 'default';
  @Input() label?: string;
  @Input() showValue = false;
  @Input() height = 8;
  @Input() animated = false;

  get clampedValue(): number {
    return Math.min(100, Math.max(0, this.value));
  }

  get barClasses(): string {
    return `ui-progress__bar ui-progress__bar--${this.variant}`;
  }
}
