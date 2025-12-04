import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="avatarClasses">
      <img *ngIf="src" [src]="src" [alt]="alt" class="ui-avatar__image" />
      <span *ngIf="!src && initials" class="ui-avatar__initials">{{ initials }}</span>
      <span *ngIf="!src && !initials" class="ui-avatar__fallback">👤</span>
      <span *ngIf="status" [class]="statusClasses"></span>
    </div>
  `,
  styles: [`
    .ui-avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #e5e7eb;
      overflow: hidden;
    }

    .ui-avatar--xs { width: 1.5rem; height: 1.5rem; font-size: 0.625rem; }
    .ui-avatar--sm { width: 2rem; height: 2rem; font-size: 0.75rem; }
    .ui-avatar--md { width: 2.5rem; height: 2.5rem; font-size: 0.875rem; }
    .ui-avatar--lg { width: 3rem; height: 3rem; font-size: 1rem; }
    .ui-avatar--xl { width: 4rem; height: 4rem; font-size: 1.25rem; }

    .ui-avatar__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ui-avatar__initials {
      font-weight: 500;
      color: #374151;
      text-transform: uppercase;
    }

    .ui-avatar__fallback {
      font-size: 1.25em;
    }

    .ui-avatar__status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 25%;
      height: 25%;
      min-width: 8px;
      min-height: 8px;
      border-radius: 50%;
      border: 2px solid white;
    }

    .ui-avatar__status--online { background-color: #10b981; }
    .ui-avatar__status--offline { background-color: #6b7280; }
    .ui-avatar__status--busy { background-color: #ef4444; }
    .ui-avatar__status--away { background-color: #f59e0b; }
  `]
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() alt = '';
  @Input() initials?: string;
  @Input() size: AvatarSize = 'md';
  @Input() status?: 'online' | 'offline' | 'busy' | 'away';

  get avatarClasses(): string {
    return `ui-avatar ui-avatar--${this.size}`;
  }

  get statusClasses(): string {
    return `ui-avatar__status ui-avatar__status--${this.status}`;
  }
}
