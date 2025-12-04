import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import {
  CardComponent,
  ButtonComponent,
  InputComponent,
  BadgeComponent,
  SpinnerComponent,
  ProgressComponent,
  TableComponent,
  type TableColumn
} from 'ui-components';
import { ShipkitService, type FeatureSpec, type ShipResult } from '../../services/shipkit.service';

@Component({
  selector: 'app-shipkit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MainLayoutComponent,
    CardComponent,
    ButtonComponent,
    InputComponent,
    BadgeComponent,
    SpinnerComponent,
    ProgressComponent,
    TableComponent
  ],
  template: `
    <app-main-layout pageTitle="ShipKit" pageSubtitle="AI-powered feature generation">
      <div class="shipkit-grid">
        <!-- Feature Generator -->
        <ui-card title="Generate Feature" subtitle="Describe your feature and let AI build it">
          <div class="generator-form">
            <ui-input
              label="Feature Name"
              placeholder="e.g., UserProfileCard"
              [(ngModel)]="featureSpec.name"
              [required]="true"
            ></ui-input>

            <div class="form-field">
              <label class="form-label">Description</label>
              <textarea
                class="form-textarea"
                rows="3"
                placeholder="Describe what this feature should do..."
                [(ngModel)]="featureSpec.description"
              ></textarea>
            </div>

            <div class="form-field">
              <label class="form-label">Requirements (one per line)</label>
              <textarea
                class="form-textarea"
                rows="4"
                placeholder="- Display user avatar&#10;- Show user name and bio&#10;- Include a follow button"
                [(ngModel)]="requirementsText"
              ></textarea>
            </div>

            <div class="generator-options">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="options.validate" />
                Validate generated code
              </label>
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="options.createFlag" />
                Create feature flag
              </label>
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="options.dryRun" />
                Dry run (preview only)
              </label>
            </div>

            <div class="generator-actions">
              <ui-button
                variant="primary"
                [loading]="isGenerating"
                [disabled]="!canGenerate"
                (clicked)="generateFeature()"
              >
                {{ isGenerating ? 'Generating...' : '🚀 Ship Feature' }}
              </ui-button>
            </div>

            <div *ngIf="isGenerating" class="generation-progress">
              <ui-progress [value]="generationProgress" [animated]="true" [showValue]="true"></ui-progress>
              <p class="progress-status">{{ generationStatus }}</p>
            </div>
          </div>
        </ui-card>

        <!-- Results Panel -->
        <ui-card title="Generation Result" subtitle="Preview generated code" *ngIf="lastResult">
          <div class="result-header">
            <ui-badge [variant]="lastResult.success ? 'success' : 'danger'">
              {{ lastResult.success ? 'Success' : 'Failed' }}
            </ui-badge>
            <span class="result-files">{{ lastResult.files?.length || 0 }} files generated</span>
          </div>

          <div *ngIf="lastResult.success" class="result-content">
            <div class="result-section">
              <h4>Generated Files</h4>
              <div class="file-list">
                <div *ngFor="let file of lastResult.files" class="file-item">
                  <span class="file-icon">📄</span>
                  <span class="file-path">{{ file.path }}</span>
                  <ui-badge size="sm" [variant]="file.action === 'create' ? 'info' : 'warning'">
                    {{ file.action }}
                  </ui-badge>
                </div>
              </div>
            </div>

            <div *ngIf="lastResult.feature?.dependencies?.length" class="result-section">
              <h4>Dependencies</h4>
              <div class="dependency-list">
                <ui-badge *ngFor="let dep of lastResult.feature?.dependencies || []" variant="default">
                  {{ dep }}
                </ui-badge>
              </div>
            </div>

            <div *ngIf="lastResult.flagName" class="result-section">
              <h4>Feature Flag</h4>
              <code class="flag-name">{{ lastResult.flagName }}</code>
            </div>
          </div>

          <div *ngIf="!lastResult.success && lastResult.errors?.length" class="error-list">
            <div *ngFor="let error of lastResult.errors" class="error-item">
              ❌ {{ error }}
            </div>
          </div>
        </ui-card>

        <!-- Component Registry -->
        <ui-card title="Component Registry" subtitle="Available components for generation">
          <div class="registry-stats">
            <span>{{ registeredComponents.length }} components registered</span>
            <ui-button variant="ghost" size="sm" (clicked)="refreshRegistry()">
              🔄 Refresh
            </ui-button>
          </div>

          <ui-table
            [columns]="registryColumns"
            [data]="registeredComponents"
            [striped]="true"
            emptyMessage="No components registered. Run discovery to find components."
          ></ui-table>
        </ui-card>

        <!-- Generation History -->
        <ui-card title="Generation History" subtitle="Recent feature generations">
          <ui-table
            [columns]="historyColumns"
            [data]="generationHistory"
            [striped]="true"
            [hoverable]="true"
            emptyMessage="No features generated yet. Start by creating your first feature!"
          ></ui-table>
        </ui-card>
      </div>
    </app-main-layout>
  `,
  styles: [`
    .shipkit-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 1200px) {
      .shipkit-grid {
        grid-template-columns: 1fr;
      }
    }

    .generator-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .form-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .form-textarea {
      padding: 0.625rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-family: inherit;
      resize: vertical;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .form-textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .generator-options {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #374151;
      cursor: pointer;
    }

    .checkbox-label input {
      width: 1rem;
      height: 1rem;
    }

    .generator-actions {
      display: flex;
      justify-content: flex-end;
    }

    .generation-progress {
      margin-top: 1rem;
    }

    .progress-status {
      margin: 0.5rem 0 0;
      font-size: 0.875rem;
      color: #6b7280;
      text-align: center;
    }

    .result-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .result-files {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .result-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .result-section h4 {
      margin: 0 0 0.75rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
    }

    .file-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .file-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: #f9fafb;
      border-radius: 0.375rem;
    }

    .file-icon {
      font-size: 1rem;
    }

    .file-path {
      flex: 1;
      font-family: monospace;
      font-size: 0.8125rem;
      color: #374151;
    }

    .dependency-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .flag-name {
      display: block;
      padding: 0.5rem 0.75rem;
      background: #f3f4f6;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }

    .error-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .error-item {
      padding: 0.75rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #991b1b;
    }

    .registry-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: #6b7280;
    }
  `]
})
export class ShipkitComponent {
  featureSpec: FeatureSpec = {
    name: '',
    description: '',
    requirements: []
  };

  requirementsText = '';

  options = {
    validate: true,
    createFlag: false,
    dryRun: false
  };

  isGenerating = false;
  generationProgress = 0;
  generationStatus = '';
  lastResult: ShipResult | null = null;

  registryColumns: TableColumn[] = [
    { key: 'name', header: 'Component', sortable: true },
    { key: 'description', header: 'Description' },
    { key: 'framework', header: 'Framework' }
  ];

  historyColumns: TableColumn[] = [
    { key: 'name', header: 'Feature', sortable: true },
    { key: 'status', header: 'Status' },
    { key: 'files', header: 'Files' },
    { key: 'date', header: 'Date', sortable: true }
  ];

  registeredComponents = [
    { name: 'Button', description: 'Primary button component with variants', framework: 'Angular' },
    { name: 'Card', description: 'Container with shadow and rounded corners', framework: 'Angular' },
    { name: 'Input', description: 'Text input with label and validation', framework: 'Angular' },
    { name: 'Badge', description: 'Status badge with color variants', framework: 'Angular' },
    { name: 'Avatar', description: 'User avatar with initials fallback', framework: 'Angular' },
    { name: 'Table', description: 'Data table with sorting and pagination', framework: 'Angular' },
    { name: 'Modal', description: 'Dialog overlay component', framework: 'Angular' },
    { name: 'Progress', description: 'Progress bar with variants', framework: 'Angular' },
    { name: 'Spinner', description: 'Loading spinner', framework: 'Angular' },
    { name: 'StatCard', description: 'Statistics card with trend indicator', framework: 'Angular' },
  ];

  generationHistory: Array<{ name: string; status: string; files: number; date: string }> = [];

  constructor(private shipkitService: ShipkitService) {}

  get canGenerate(): boolean {
    return this.featureSpec.name.trim().length > 0 &&
           this.featureSpec.description.trim().length > 0;
  }

  async generateFeature(): Promise<void> {
    this.isGenerating = true;
    this.generationProgress = 0;
    this.lastResult = null;

    const requirements = this.requirementsText
      .split('\n')
      .map(r => r.replace(/^[-*]\s*/, '').trim())
      .filter(r => r.length > 0);

    const spec: FeatureSpec = {
      ...this.featureSpec,
      requirements
    };

    const progressSteps = [
      { progress: 20, status: 'Analyzing requirements...' },
      { progress: 40, status: 'Discovering components...' },
      { progress: 60, status: 'Generating code with AI...' },
      { progress: 80, status: 'Validating output...' },
      { progress: 100, status: 'Complete!' }
    ];

    for (const step of progressSteps) {
      await this.delay(800);
      this.generationProgress = step.progress;
      this.generationStatus = step.status;
    }

    try {
      this.lastResult = await this.shipkitService.ship(spec, this.options);

      this.generationHistory.unshift({
        name: spec.name,
        status: this.lastResult.success ? 'Success' : 'Failed',
        files: this.lastResult.files?.length || 0,
        date: 'Just now'
      });
    } catch (error) {
      this.lastResult = {
        success: false,
        errors: [(error as Error).message]
      };
    }

    this.isGenerating = false;
  }

  refreshRegistry(): void {
    console.log('Refreshing component registry...');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
