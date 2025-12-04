import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarComponent } from 'ui-components';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AvatarComponent],
  template: `
    <aside class="sidebar">
      <div class="sidebar__header">
        <div class="sidebar__logo">
          <span class="sidebar__logo-icon">🚀</span>
          <span class="sidebar__logo-text">ShipKit</span>
        </div>
      </div>

      <nav class="sidebar__nav">
        <a
          *ngFor="let item of navItems"
          [routerLink]="item.route"
          routerLinkActive="sidebar__nav-item--active"
          [routerLinkActiveOptions]="{ exact: item.route === '/' }"
          class="sidebar__nav-item"
        >
          <span class="sidebar__nav-icon">{{ item.icon }}</span>
          <span class="sidebar__nav-label">{{ item.label }}</span>
        </a>
      </nav>

      <div class="sidebar__footer">
        <div class="sidebar__user">
          <ui-avatar initials="JD" size="sm" status="online"></ui-avatar>
          <div class="sidebar__user-info">
            <span class="sidebar__user-name">John Doe</span>
            <span class="sidebar__user-role">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      height: 100vh;
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
    }

    .sidebar__header {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar__logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .sidebar__logo-icon {
      font-size: 1.5rem;
    }

    .sidebar__logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
    }

    .sidebar__nav {
      flex: 1;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .sidebar__nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      color: #94a3b8;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .sidebar__nav-item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: white;
    }

    .sidebar__nav-item--active {
      background: rgba(59, 130, 246, 0.2);
      color: #3b82f6;
    }

    .sidebar__nav-icon {
      font-size: 1.125rem;
    }

    .sidebar__nav-label {
      font-size: 0.9375rem;
      font-weight: 500;
    }

    .sidebar__footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar__user {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .sidebar__user-info {
      display: flex;
      flex-direction: column;
    }

    .sidebar__user-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: white;
    }

    .sidebar__user-role {
      font-size: 0.75rem;
      color: #64748b;
    }
  `]
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/' },
    { label: 'Users', icon: '👥', route: '/users' },
    { label: 'ShipKit', icon: '🚀', route: '/shipkit' },
    { label: 'Settings', icon: '⚙️', route: '/settings' },
  ];
}
