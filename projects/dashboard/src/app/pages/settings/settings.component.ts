import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import {
  CardComponent,
  ButtonComponent,
  InputComponent
} from 'ui-components';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    CardComponent,
    ButtonComponent,
    InputComponent
  ],
  template: `
    <app-main-layout pageTitle="Settings" pageSubtitle="Manage your application settings and preferences.">
      <div class="settings-grid">
        <ui-card title="General Settings" subtitle="Basic application configuration">
          <div class="form-section">
            <ui-input label="Application Name" placeholder="Enter app name" hint="This will be displayed in the header"></ui-input>
            <ui-input label="Support Email" type="email" placeholder="support@example.com"></ui-input>
            <ui-input label="Time Zone" placeholder="UTC+0"></ui-input>
          </div>
          <div class="form-actions">
            <ui-button variant="primary">Save Changes</ui-button>
          </div>
        </ui-card>

        <ui-card title="API Configuration" subtitle="Configure your API keys and endpoints">
          <div class="form-section">
            <ui-input label="API Key" type="password" placeholder="sk-..." hint="Keep this secret!"></ui-input>
            <ui-input label="API Endpoint" placeholder="https://api.example.com"></ui-input>
          </div>
          <div class="form-actions">
            <ui-button variant="ghost">Reset API Key</ui-button>
            <ui-button variant="primary">Update</ui-button>
          </div>
        </ui-card>

        <ui-card title="ShipKit Configuration" subtitle="Configure AI-powered feature generation">
          <div class="form-section">
            <ui-input label="OpenAI API Key" type="password" placeholder="sk-..."></ui-input>
            <ui-input label="Components Directory" placeholder="./src/components"></ui-input>
            <ui-input label="Output Directory" placeholder="./src/features"></ui-input>
          </div>
          <div class="form-actions">
            <ui-button variant="primary">Save ShipKit Config</ui-button>
          </div>
        </ui-card>

        <ui-card title="Danger Zone" subtitle="Irreversible actions">
          <div class="danger-section">
            <div class="danger-item">
              <div>
                <strong>Delete All Features</strong>
                <p>Remove all AI-generated features from the codebase.</p>
              </div>
              <ui-button variant="danger">Delete Features</ui-button>
            </div>
            <div class="danger-item">
              <div>
                <strong>Reset Configuration</strong>
                <p>Reset all settings to default values.</p>
              </div>
              <ui-button variant="danger">Reset</ui-button>
            </div>
          </div>
        </ui-card>
      </div>
    </app-main-layout>
  `,
  styles: [`
    .settings-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 800px;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    .danger-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .danger-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #fef2f2;
      border-radius: 0.5rem;
      border: 1px solid #fecaca;
    }

    .danger-item p {
      margin: 0.25rem 0 0;
      font-size: 0.875rem;
      color: #6b7280;
    }
  `]
})
export class SettingsComponent {}
