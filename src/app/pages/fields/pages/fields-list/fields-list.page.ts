import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import type { Field } from '../../models/field.models';
import { FieldsService, FieldFilters } from '../../services/fields.service';
import { ExportsService } from '../../services/exports.service';
import { ImportsService, MinimalFile } from '../../services/imports.service';

@Component({
  selector: 'app-fields-list-page',
  templateUrl: './fields-list.page.html',
  styleUrls: ['./fields-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsListPageComponent {
  private readonly fieldsService = inject(FieldsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly exportsService = inject(ExportsService);
  private readonly importsService = inject(ImportsService);
  private readonly snackBar = inject(MatSnackBar);

  readonly fields$: Observable<Field[]> = this.fieldsService.getFilteredFields();
  readonly stats$ = this.fieldsService.getStats();

  displayedColumns: Array<keyof Field | 'actions'> = ['nom', 'surfaceHa', 'statut', 'modeProduction', 'actions'];

  onFiltersChange(filters: FieldFilters): void {
    this.fieldsService.updateFilters(filters);
  }

  openDetail(field: Field): void {
    this.router.navigate([field.id], { relativeTo: this.route });
  }

  openMap(): void {
    this.router.navigate(['carte'], { relativeTo: this.route });
  }

  exportCsv(fields: Field[]): void {
    this.exportsService
      .exportCsv(fields)
      .pipe(take(1))
      .subscribe((csv) => {
        console.info(csv);
        this.snackBar.open('Export CSV généré (console)', 'Fermer', { duration: 3000 });
      });
  }

  importMock(): void {
    const fakeFile: MinimalFile = { name: 'import-mock.csv', text: async () => '' };
    this.importsService
      .importFields(fakeFile)
      .pipe(take(1))
      .subscribe((count) => {
        this.snackBar.open(`${count} parcelles importées (mock)`, 'Fermer', { duration: 3000 });
      });
  }
}
