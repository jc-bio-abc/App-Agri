import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import type { Activity } from '../models/field.models';
import type { FieldActivityEvent, MonthlyActivitySummary, SyncResult } from '../models/activities.models';

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-001',
    fieldIds: ['fld-001'],
    type: 'semis',
    status: 'terminee',
    datePrevue: '2024-10-15',
    dateReelle: '2024-10-17',
    commentaire: 'Semis réalisé en bonne condition.',
    intrants: [
      { produit: 'Semence blé bio', doseHa: 180, unite: 'graines_m2' }
    ]
  },
  {
    id: 'act-002',
    fieldIds: ['fld-001', 'fld-002'],
    type: 'pulverisation',
    status: 'planifiee',
    datePrevue: '2024-11-03',
    commentaire: 'Traitement foliaire algues',
    intrants: [
      { produit: 'Biostimulant algues', doseHa: 2, unite: 'l/ha', quantiteTotale: 25 }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class ActivitiesSyncService {
  private readonly activities$ = new BehaviorSubject<Activity[]>(MOCK_ACTIVITIES);

  /**
   * Retourne toutes les activités associées à la parcelle.
   */
  getActivitiesForField(fieldId: string): Observable<Activity[]> {
    return this.activities$.pipe(map((activities) => activities.filter((activity) => activity.fieldIds.includes(fieldId))));
  }

  /**
   * Transforme les activités en événements de timeline front.
   */
  getTimeline(fieldId: string): Observable<FieldActivityEvent[]> {
    return this.getActivitiesForField(fieldId).pipe(
      map((activities) =>
        activities.map((activity) => ({
          id: `evt-${activity.id}`,
          activityId: activity.id,
          fieldId,
          type: activity.type,
          status: activity.status,
          date: activity.dateReelle ?? activity.datePrevue ?? new Date().toISOString(),
          description: activity.commentaire ?? 'Action planifiée',
          highlight: activity.status === 'en_cours'
        }))
      )
    );
  }

  /**
   * Simule une synchronisation distante : attente artificielle puis retour du flux.
   */
  syncFieldActivities(fieldId: string): Observable<SyncResult> {
    const source = 'mock-partner';
    return this.getActivitiesForField(fieldId).pipe(
      delay(600),
      map((activities) => ({
        activities,
        syncedAt: new Date().toISOString(),
        source
      }))
    );
  }

  /**
   * Retourne un résumé mensuel pour alimenter les statistiques.
   */
  getMonthlySummary(fieldId: string): Observable<MonthlyActivitySummary[]> {
    return this.getActivitiesForField(fieldId).pipe(
      map((activities) => {
        const byMonth = new Map<string, MonthlyActivitySummary>();
        activities.forEach((activity) => {
          const date = activity.dateReelle ?? activity.datePrevue ?? new Date().toISOString();
          const month = date.slice(0, 7);
          const current = byMonth.get(month) ?? { month, planned: 0, completed: 0, cancelled: 0 };
          if (activity.status === 'terminee') {
            current.completed += 1;
          } else if (activity.status === 'annulee') {
            current.cancelled += 1;
          } else {
            current.planned += 1;
          }
          byMonth.set(month, current);
        });
        return Array.from(byMonth.values()).sort((a, b) => (a.month > b.month ? 1 : -1));
      })
    );
  }

  /**
   * Ajoute une activité à la volée.
   */
  createActivity(activity: Activity): Observable<Activity> {
    const current = [...this.activities$.value, activity];
    this.activities$.next(current);
    return of(activity);
  }
}
