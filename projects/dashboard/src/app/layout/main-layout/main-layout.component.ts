import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  template: `
    <div class="layout">
      <app-sidebar></app-sidebar>
      <main class="layout__main">
        <app-header [title]="pageTitle" [subtitle]="pageSubtitle"></app-header>
        <div class="layout__content">
          <ng-content></ng-content>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
    }

    .layout__main {
      flex: 1;
      margin-left: 260px;
      display: flex;
      flex-direction: column;
    }

    .layout__content {
      flex: 1;
      padding: 2rem;
      background: #f3f4f6;
    }
  `]
})
export class MainLayoutComponent {
  @Input() pageTitle = 'Dashboard';
  @Input() pageSubtitle?: string;
}
