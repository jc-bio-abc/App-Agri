import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldActionFormValue } from '../../components/field-actions-form/field-actions-form.component';
import { FieldFilterValue } from '../../components/field-filters/field-filters.component';

interface FieldItem {
  readonly id: number;
  readonly name: string;
  readonly crop: string;
  readonly area: number;
  readonly status: 'ready' | 'sowing' | 'harvest';
}

@Component({
  selector: 'app-fields-list-page',
  templateUrl: './fields-list.page.html',
  styleUrls: ['./fields-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsListPageComponent {
  private readonly allFields: readonly FieldItem[] = [
    { id: 1, name: 'Ferme Nord', crop: 'CROPS.WHEAT', area: 12.4, status: 'ready' },
    { id: 2, name: 'Prairie Est', crop: 'CROPS.CORN', area: 8.1, status: 'sowing' },
    { id: 3, name: 'Verger Sud', crop: 'CROPS.BARLEY', area: 5.6, status: 'harvest' }
  ];

  filteredFields: FieldItem[] = [...this.allFields];
  readonly actionLogs: string[] = [];

  onFiltersChange(filters: FieldFilterValue): void {
    this.filteredFields = this.allFields.filter(field => {
      const matchesSearch = filters.search
        ? field.name.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      const matchesCrop = filters.crop ? field.crop.endsWith(filters.crop.toUpperCase()) : true;
      const matchesArea = filters.minArea !== null ? field.area >= filters.minArea : true;
      return matchesSearch && matchesCrop && matchesArea;
    });
  }

  onActionSubmit(fieldId: number, action: FieldActionFormValue): void {
    const field = this.allFields.find(item => item.id === fieldId);
    if (!field) {
      return;
    }

    const logEntry = `${field.name} · ${action.action} · ${action.date}`;
    this.actionLogs.unshift(logEntry);
  }
}
