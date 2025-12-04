import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, TemplateRef, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc' | null;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ui-table-wrapper">
      <table class="ui-table">
        <thead class="ui-table__head">
          <tr>
            <th
              *ngFor="let col of columns"
              class="ui-table__header"
              [style.width]="col.width"
              [class.ui-table__header--sortable]="col.sortable"
              (click)="col.sortable && onSort(col.key)"
            >
              <div class="ui-table__header-content">
                <span>{{ col.header }}</span>
                <span *ngIf="col.sortable" class="ui-table__sort-icon">
                  {{ getSortIcon(col.key) }}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="ui-table__body">
          <tr
            *ngFor="let row of data; let i = index"
            class="ui-table__row"
            [class.ui-table__row--striped]="striped && i % 2 === 1"
            [class.ui-table__row--hoverable]="hoverable"
            (click)="rowClick.emit(row)"
          >
            <td *ngFor="let col of columns" class="ui-table__cell">
              {{ row[col.key] }}
            </td>
          </tr>
          <tr *ngIf="data.length === 0" class="ui-table__row--empty">
            <td [attr.colspan]="columns.length" class="ui-table__cell ui-table__cell--empty">
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .ui-table-wrapper {
      overflow-x: auto;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
    }

    .ui-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .ui-table__head {
      background-color: #f9fafb;
    }

    .ui-table__header {
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;
    }

    .ui-table__header--sortable {
      cursor: pointer;
      user-select: none;
    }

    .ui-table__header--sortable:hover {
      background-color: #f3f4f6;
    }

    .ui-table__header-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .ui-table__sort-icon {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    .ui-table__row {
      transition: background-color 0.15s ease;
    }

    .ui-table__row--striped {
      background-color: #f9fafb;
    }

    .ui-table__row--hoverable:hover {
      background-color: #f3f4f6;
      cursor: pointer;
    }

    .ui-table__cell {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e5e7eb;
      color: #111827;
    }

    .ui-table__cell--empty {
      text-align: center;
      color: #6b7280;
      padding: 2rem 1rem;
    }
  `]
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: Array<{ [key: string]: unknown }> = [];
  @Input() striped = false;
  @Input() hoverable = false;
  @Input() emptyMessage = 'No data available';

  @Output() sortChange = new EventEmitter<SortEvent>();
  @Output() rowClick = new EventEmitter<Record<string, unknown>>();

  currentSort: SortEvent = { column: '', direction: null };

  onSort(column: string): void {
    let direction: 'asc' | 'desc' | null = 'asc';

    if (this.currentSort.column === column) {
      if (this.currentSort.direction === 'asc') direction = 'desc';
      else if (this.currentSort.direction === 'desc') direction = null;
    }

    this.currentSort = { column, direction };
    this.sortChange.emit(this.currentSort);
  }

  getSortIcon(column: string): string {
    if (this.currentSort.column !== column) return '↕';
    if (this.currentSort.direction === 'asc') return '↑';
    if (this.currentSort.direction === 'desc') return '↓';
    return '↕';
  }
}
