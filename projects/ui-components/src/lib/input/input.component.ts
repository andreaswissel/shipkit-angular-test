import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="ui-input-wrapper">
      <label *ngIf="label" class="ui-input__label" [for]="inputId">
        {{ label }}
        <span *ngIf="required" class="ui-input__required">*</span>
      </label>
      <div class="ui-input__container" [class.ui-input__container--error]="error">
        <span *ngIf="prefixIcon" class="ui-input__icon ui-input__icon--prefix">{{ prefixIcon }}</span>
        <input
          [id]="inputId"
          class="ui-input"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [(ngModel)]="value"
          (ngModelChange)="onValueChange($event)"
          (blur)="onTouched()"
        />
        <span *ngIf="suffixIcon" class="ui-input__icon ui-input__icon--suffix">{{ suffixIcon }}</span>
      </div>
      <p *ngIf="error" class="ui-input__error">{{ error }}</p>
      <p *ngIf="hint && !error" class="ui-input__hint">{{ hint }}</p>
    </div>
  `,
  styles: [`
    .ui-input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .ui-input__label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .ui-input__required {
      color: #ef4444;
    }

    .ui-input__container {
      display: flex;
      align-items: center;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      background: white;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .ui-input__container:focus-within {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .ui-input__container--error {
      border-color: #ef4444;
    }

    .ui-input__container--error:focus-within {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .ui-input {
      flex: 1;
      padding: 0.625rem 0.75rem;
      border: none;
      outline: none;
      font-size: 1rem;
      font-family: inherit;
      background: transparent;
    }

    .ui-input:disabled {
      background: #f3f4f6;
      cursor: not-allowed;
    }

    .ui-input__icon {
      padding: 0 0.75rem;
      color: #9ca3af;
    }

    .ui-input__error {
      margin: 0;
      font-size: 0.75rem;
      color: #ef4444;
    }

    .ui-input__hint {
      margin: 0;
      font-size: 0.75rem;
      color: #6b7280;
    }
  `]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'password' | 'email' | 'number' | 'tel' = 'text';
  @Input() disabled = false;
  @Input() required = false;
  @Input() error?: string;
  @Input() hint?: string;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;

  @Output() valueChange = new EventEmitter<string>();

  value = '';
  inputId = `ui-input-${Math.random().toString(36).substr(2, 9)}`;

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: string): void {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
}
