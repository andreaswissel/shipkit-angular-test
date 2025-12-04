import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SpinnerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="spinnerClasses" role="status" aria-label="Loading">
      <svg viewBox="0 0 24 24" fill="none" class="ui-spinner__svg">
        <circle
          class="ui-spinner__track"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3"
        />
        <path
          class="ui-spinner__indicator"
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </div>
  `,
  styles: [`
    .ui-spinner {
      display: inline-flex;
      color: #3b82f6;
    }

    .ui-spinner--sm { width: 1rem; height: 1rem; }
    .ui-spinner--md { width: 1.5rem; height: 1.5rem; }
    .ui-spinner--lg { width: 2rem; height: 2rem; }

    .ui-spinner__svg {
      width: 100%;
      height: 100%;
      animation: spin 1s linear infinite;
    }

    .ui-spinner__track {
      opacity: 0.25;
    }

    .ui-spinner__indicator {
      opacity: 1;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = 'md';

  get spinnerClasses(): string {
    return `ui-spinner ui-spinner--${this.size}`;
  }
}
