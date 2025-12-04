import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClasses"
      [disabled]="disabled || loading"
      [type]="type"
      (click)="handleClick($event)"
    >
      <span *ngIf="loading" class="ui-button__spinner"></span>
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .ui-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 500;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .ui-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ui-button--sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }

    .ui-button--md {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    .ui-button--lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    }

    .ui-button--primary {
      background-color: #3b82f6;
      color: white;
    }

    .ui-button--primary:hover:not(:disabled) {
      background-color: #2563eb;
    }

    .ui-button--secondary {
      background-color: #6b7280;
      color: white;
    }

    .ui-button--secondary:hover:not(:disabled) {
      background-color: #4b5563;
    }

    .ui-button--danger {
      background-color: #ef4444;
      color: white;
    }

    .ui-button--danger:hover:not(:disabled) {
      background-color: #dc2626;
    }

    .ui-button--ghost {
      background-color: transparent;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .ui-button--ghost:hover:not(:disabled) {
      background-color: #f3f4f6;
    }

    .ui-button__spinner {
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    return `ui-button ui-button--${this.variant} ui-button--${this.size}`;
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
