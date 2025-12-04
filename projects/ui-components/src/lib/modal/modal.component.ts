import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div *ngIf="isOpen" class="ui-modal-overlay" (click)="onOverlayClick($event)">
      <div [class]="modalClasses" role="dialog" aria-modal="true">
        <div class="ui-modal__header">
          <h2 class="ui-modal__title">{{ title }}</h2>
          <button
            *ngIf="showCloseButton"
            class="ui-modal__close"
            (click)="close()"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div class="ui-modal__body">
          <ng-content></ng-content>
        </div>
        <div *ngIf="showFooter" class="ui-modal__footer">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ui-modal-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 1000;
      animation: fadeIn 0.15s ease;
    }

    .ui-modal {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      max-height: calc(100vh - 2rem);
      display: flex;
      flex-direction: column;
      animation: slideIn 0.2s ease;
    }

    .ui-modal--sm { width: 100%; max-width: 24rem; }
    .ui-modal--md { width: 100%; max-width: 32rem; }
    .ui-modal--lg { width: 100%; max-width: 48rem; }
    .ui-modal--xl { width: 100%; max-width: 64rem; }

    .ui-modal__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .ui-modal__title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
    }

    .ui-modal__close {
      background: none;
      border: none;
      font-size: 1.25rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0.25rem;
      line-height: 1;
      border-radius: 0.25rem;
      transition: color 0.15s ease, background-color 0.15s ease;
    }

    .ui-modal__close:hover {
      color: #111827;
      background-color: #f3f4f6;
    }

    .ui-modal__body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;
    }

    .ui-modal__footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
      border-radius: 0 0 0.75rem 0.75rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-1rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: ModalSize = 'md';
  @Input() showCloseButton = true;
  @Input() showFooter = false;
  @Input() closeOnOverlayClick = true;
  @Input() closeOnEscape = true;

  @Output() closed = new EventEmitter<void>();

  get modalClasses(): string {
    return `ui-modal ui-modal--${this.size}`;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.closeOnEscape && this.isOpen) {
      this.close();
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }
}
