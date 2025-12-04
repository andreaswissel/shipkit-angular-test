import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import {
  CardComponent,
  TableComponent,
  ButtonComponent,
  BadgeComponent,
  AvatarComponent,
  ModalComponent,
  InputComponent,
  type TableColumn
} from 'ui-components';

interface User {
  [key: string]: unknown;
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    CardComponent,
    TableComponent,
    ButtonComponent,
    BadgeComponent,
    AvatarComponent,
    ModalComponent,
    InputComponent
  ],
  template: `
    <app-main-layout pageTitle="Users" pageSubtitle="Manage your team members and their permissions.">
      <ui-card>
        <div class="users-header">
          <div class="users-stats">
            <span class="users-count">{{ users.length }} users</span>
            <ui-badge variant="success">{{ activeUsers }} active</ui-badge>
          </div>
          <ui-button variant="primary" (clicked)="openAddUserModal()">+ Add User</ui-button>
        </div>

        <ui-table
          [columns]="columns"
          [data]="users"
          [striped]="true"
          [hoverable]="true"
        ></ui-table>
      </ui-card>

      <ui-modal
        [isOpen]="isModalOpen"
        title="Add New User"
        [showFooter]="true"
        (closed)="closeModal()"
      >
        <div class="form-grid">
          <ui-input label="Full Name" placeholder="Enter full name" [required]="true"></ui-input>
          <ui-input label="Email" type="email" placeholder="Enter email" [required]="true"></ui-input>
          <ui-input label="Role" placeholder="Enter role"></ui-input>
        </div>
        <div modal-footer>
          <ui-button variant="ghost" (clicked)="closeModal()">Cancel</ui-button>
          <ui-button variant="primary" (clicked)="closeModal()">Add User</ui-button>
        </div>
      </ui-modal>
    </app-main-layout>
  `,
  styles: [`
    .users-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .users-stats {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .users-count {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .form-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `]
})
export class UsersComponent {
  isModalOpen = false;

  columns: TableColumn[] = [
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
  ];

  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: '' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active', avatar: '' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Inactive', avatar: '' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', status: 'Active', avatar: '' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Manager', status: 'Active', avatar: '' },
    { id: 6, name: 'Diana Ross', email: 'diana@example.com', role: 'Developer', status: 'Active', avatar: '' },
  ];

  get activeUsers(): number {
    return this.users.filter(u => u.status === 'Active').length;
  }

  openAddUserModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
