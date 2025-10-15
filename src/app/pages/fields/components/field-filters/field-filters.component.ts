import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import type { Field } from '../../models/field.models';
import type { FieldFilters } from '../../services/fields.service';

@Component({
  selector: 'app-field-filters',
  templateUrl: './field-filters.component.html',
  styleUrls: ['./field-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFiltersComponent implements OnInit, OnDestroy {
  @Output() readonly filtersChange = new EventEmitter<FieldFilters>();

  readonly form = this.fb.group({
    search: [''],
    statut: [[] as Field['statut'][]],
    modeProduction: [[] as Field['modeProduction'][]]
  });

  readonly statusOptions: Field['statut'][] = ['active', 'jachere', 'a_ceder', 'non_geree'];
  readonly modeOptions: Field['modeProduction'][] = ['bio', 'conversion_annee1', 'conversion_annee2', 'conventionnel'];

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => this.filtersChange.emit(value as FieldFilters));
    this.filtersChange.emit(this.form.getRawValue() as FieldFilters);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reset(): void {
    this.form.reset({ search: '', statut: [], modeProduction: [] });
  }
}
