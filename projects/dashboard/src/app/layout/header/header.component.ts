import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputComponent } from 'ui-components';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent],
  template: `
    <header class="header">
      <div class="header__left">
        <h1 class="header__title">{{ title }}</h1>
        <p *ngIf="subtitle" class="header__subtitle">{{ subtitle }}</p>
      </div>
      <div class="header__right">
        <ui-input placeholder="Search..." prefixIcon="🔍"></ui-input>
        <ui-button variant="primary">
          + New Feature
        </ui-button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background: white;
      border-bottom: 1px solid #e5e7eb;
    }

    .header__left {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .header__title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
    }

    .header__subtitle {
      margin: 0;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .header__right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `]
})
export class HeaderComponent {
  @Input() title = 'Dashboard';
  @Input() subtitle?: string;
}
