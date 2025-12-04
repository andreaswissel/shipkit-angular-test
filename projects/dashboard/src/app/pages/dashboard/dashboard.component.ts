import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import {
  StatCardComponent,
  CardComponent,
  TableComponent,
  BadgeComponent,
  AvatarComponent,
  ProgressComponent,
  type TableColumn
} from 'ui-components';

interface Activity {
  user: string;
  action: string;
  target: string;
  time: string;
}

interface RecentFeature {
  [key: string]: unknown;
  name: string;
  status: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    StatCardComponent,
    CardComponent,
    TableComponent,
    BadgeComponent,
    AvatarComponent,
    ProgressComponent
  ],
  template: `
    <app-main-layout pageTitle="Dashboard" pageSubtitle="Welcome back! Here's what's happening with your projects.">
      <!-- Stats Grid -->
      <div class="stats-grid">
        <ui-stat-card
          label="Features Shipped"
          value="48"
          icon="🚀"
          [trend]="12"
          trendLabel="from last month"
        ></ui-stat-card>
        <ui-stat-card
          label="Active Users"
          value="2,543"
          icon="👥"
          [trend]="8.2"
          trendLabel="from last week"
        ></ui-stat-card>
        <ui-stat-card
          label="Success Rate"
          value="94.2%"
          icon="✅"
          [trend]="2.1"
          trendLabel="from last month"
        ></ui-stat-card>
        <ui-stat-card
          label="AI Generations"
          value="1,234"
          icon="🤖"
          [trend]="-5.4"
          trendLabel="from yesterday"
        ></ui-stat-card>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- Recent Features -->
        <ui-card title="Recent Features" subtitle="Features shipped this week">
          <ui-table [columns]="featureColumns" [data]="recentFeatures" [hoverable]="true"></ui-table>
        </ui-card>

        <!-- Activity Feed -->
        <ui-card title="Activity Feed" subtitle="Latest team activities">
          <div class="activity-list">
            <div *ngFor="let activity of activities" class="activity-item">
              <ui-avatar [initials]="getInitials(activity.user)" size="sm"></ui-avatar>
              <div class="activity-content">
                <p class="activity-text">
                  <strong>{{ activity.user }}</strong> {{ activity.action }}
                  <span class="activity-target">{{ activity.target }}</span>
                </p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </ui-card>
      </div>

      <!-- Progress Section -->
      <div class="progress-section">
        <ui-card title="Monthly Goals" subtitle="Track your progress">
          <div class="progress-list">
            <ui-progress [value]="75" label="Feature Completion" [showValue]="true" variant="default"></ui-progress>
            <ui-progress [value]="92" label="Test Coverage" [showValue]="true" variant="success"></ui-progress>
            <ui-progress [value]="60" label="Documentation" [showValue]="true" variant="warning"></ui-progress>
            <ui-progress [value]="88" label="User Satisfaction" [showValue]="true" variant="default"></ui-progress>
          </div>
        </ui-card>
      </div>
    </app-main-layout>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    @media (max-width: 1200px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      gap: 0.75rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .activity-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .activity-content {
      flex: 1;
    }

    .activity-text {
      margin: 0;
      font-size: 0.875rem;
      color: #374151;
    }

    .activity-target {
      color: #3b82f6;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    .progress-section {
      max-width: 600px;
    }

    .progress-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  `]
})
export class DashboardComponent {
  featureColumns: TableColumn[] = [
    { key: 'name', header: 'Feature Name', sortable: true },
    { key: 'status', header: 'Status' },
    { key: 'author', header: 'Author' },
    { key: 'date', header: 'Date', sortable: true },
  ];

  recentFeatures: RecentFeature[] = [
    { name: 'User Authentication', status: 'Deployed', author: 'John D.', date: '2 hours ago' },
    { name: 'Payment Integration', status: 'In Review', author: 'Jane S.', date: '5 hours ago' },
    { name: 'Dashboard Analytics', status: 'Deployed', author: 'Bob J.', date: '1 day ago' },
    { name: 'Email Notifications', status: 'Testing', author: 'Alice B.', date: '2 days ago' },
  ];

  activities: Activity[] = [
    { user: 'John Doe', action: 'shipped feature', target: 'User Authentication', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'created PR for', target: 'Payment Integration', time: '5 hours ago' },
    { user: 'Bob Johnson', action: 'deployed', target: 'Dashboard Analytics', time: '1 day ago' },
    { user: 'Alice Brown', action: 'started testing', target: 'Email Notifications', time: '2 days ago' },
  ];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
