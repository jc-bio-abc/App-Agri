import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface FieldFilterValue {
  readonly search: string;
  readonly crop: string;
  readonly minArea: number | null;
}

type FieldFiltersFormGroup = FormGroup<{
  search: FormControl<string>;
  crop: FormControl<string>;
  minArea: FormControl<number | null>;
}>;

@Component({
  selector: 'app-field-filters',
  templateUrl: './field-filters.component.html',
  styleUrls: ['./field-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFiltersComponent {
  @Output() readonly filtersChange = new EventEmitter<FieldFilterValue>();

  readonly crops: readonly string[] = ['wheat', 'corn', 'barley', 'sunflower'];
  readonly form: FieldFiltersFormGroup = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    crop: new FormControl('', { nonNullable: true }),
    minArea: new FormControl<number | null>(null)
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this.filtersChange.emit({
        search: value.search ?? '',
        crop: value.crop ?? '',
        minArea: value.minArea ?? null
      });
    });
  }
}
