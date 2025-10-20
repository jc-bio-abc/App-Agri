import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import type { Activity, Field } from '../../models/field.models';
import { FieldsService } from '../../services/fields.service';
import { ActivitiesSyncService } from '../../services/activities-sync.service';

interface JournalEntry {
  id: string;
  date: string;
  author: string;
  message: string;
}

@Component({
  selector: 'app-field-detail-page',
  templateUrl: './field-detail.page.html',
  styleUrls: ['./field-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly fieldsService = inject(FieldsService);
  private readonly activitiesService = inject(ActivitiesSyncService);
  private readonly snackBar = inject(MatSnackBar);

  private readonly fieldId$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((id): id is string => id !== null)
  );

  readonly field$: Observable<Field | undefined> = this.fieldId$.pipe(switchMap((id) => this.fieldsService.getField(id)));
  readonly timeline$ = this.fieldId$.pipe(switchMap((id) => this.activitiesService.getTimeline(id)));
  readonly monthlySummary$ = this.fieldId$.pipe(switchMap((id) => this.activitiesService.getMonthlySummary(id)));

  readonly journalEntries: JournalEntry[] = [
    { id: 'j-1', date: '2024-08-30T10:00:00Z', author: 'Jean-Charles', message: 'Contrôle adventices réalisé.' },
    { id: 'j-2', date: '2024-09-12T16:30:00Z', author: 'Amandine', message: 'Irrigation annulée (pluie prévue).' }
  ];

  createActivity(activity: Activity): void {
    this.activitiesService
      .createActivity(activity)
      .pipe(take(1))
      .subscribe(() => {
        this.snackBar.open('Activité planifiée', 'Fermer', { duration: 3000 });
      });
  }

  addAttachment(field: Field | undefined): void {
    if (!field) {
      return;
    }
    const attachment = {
      id: crypto.randomUUID(),
      name: `Note ${new Date().toLocaleDateString()}`,
      type: 'doc' as const,
      createdAt: new Date().toISOString()
    };
    this.fieldsService
      .addAttachment(field.id, attachment)
      .pipe(take(1))
      .subscribe(() => {
        this.snackBar.open('Pièce jointe ajoutée (mock)', 'Fermer', { duration: 3000 });
      });
  }

  sync(fieldId: string): void {
    this.activitiesService
      .syncFieldActivities(fieldId)
      .pipe(take(1))
      .subscribe((result) => {
        this.snackBar.open(`Activités synchronisées (${result.activities.length})`, 'Fermer', { duration: 3000 });
      });
  }
}
