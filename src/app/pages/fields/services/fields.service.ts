import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import type { Field } from '../models/field.models';
import { FieldsGeoService } from './fields-geo.service';

export interface FieldFilters {
  search?: string;
  statut?: Field['statut'][];
  modeProduction?: Field['modeProduction'][];
}

const MOCK_FIELDS: Field[] = [
  {
    id: 'fld-001',
    exploitationId: 'exp-001',
    nom: 'Blé tendre Nord',
    codeInterne: 'BT-N',
    surfaceHa: 0,
    geom: {
      type: 'Polygon',
      coordinates: [
        [
          [1.2, 43.6],
          [1.205, 43.6],
          [1.205, 43.605],
          [1.2, 43.605],
          [1.2, 43.6]
        ]
      ]
    },
    isLockedGeom: false,
    modeProduction: 'bio',
    statut: 'active',
    irrigation: 'aspersion',
    notes: 'Semé fin octobre, attention au salissement en bordure.',
    dateCreation: '2020-03-12',
    dateMaj: '2024-02-01',
    attachments: [
      {
        id: 'att-01',
        name: 'Photo drone 2024',
        type: 'photo',
        createdAt: '2024-02-10',
        url: '#'
      }
    ],
    subzones: undefined,
    histories: [
      { annee: 2023, principale: { nom: 'Blé', variete: 'Apache', surfaceHa: 12.5 } },
      { annee: 2022, principale: { nom: 'Luzerne', surfaceHa: 12.5 } }
    ]
  },
  {
    id: 'fld-002',
    exploitationId: 'exp-001',
    nom: 'Prairie Sud',
    surfaceHa: 0,
    geom: {
      type: 'Polygon',
      coordinates: [
        [
          [1.215, 43.61],
          [1.218, 43.61],
          [1.218, 43.613],
          [1.215, 43.613],
          [1.215, 43.61]
        ]
      ]
    },
    isLockedGeom: true,
    modeProduction: 'conventionnel',
    statut: 'jachere',
    irrigation: 'non',
    dateCreation: '2015-11-04',
    dateMaj: '2023-12-20',
    attachments: [],
    histories: [
      { annee: 2023, principale: { nom: 'Prairie multi-espèces' } },
      { annee: 2022, principale: { nom: 'Prairie multi-espèces' } }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class FieldsService {
  private readonly fields$ = new BehaviorSubject<Field[]>([]);
  private readonly filters$ = new BehaviorSubject<FieldFilters>({});

  constructor(private readonly geoService: FieldsGeoService) {
    const withSurface = MOCK_FIELDS.map((field) => ({
      ...field,
      surfaceHa: geoService.calculateAreaHa(field.geom)
    }));
    this.fields$.next(withSurface);
  }

  /**
   * Observable de la liste de parcelles filtrée.
   */
  getFilteredFields(): Observable<Field[]> {
    return combineLatest([this.fields$, this.filters$]).pipe(
      map(([fields, filters]) => this.applyFilters(fields, filters))
    );
  }

  /**
   * Retourne la parcelle demandée.
   */
  getField(id: string): Observable<Field | undefined> {
    return this.fields$.pipe(map((fields) => fields.find((field) => field.id === id)));
  }

  /**
   * Modifie les filtres actifs.
   */
  updateFilters(filters: FieldFilters): void {
    this.filters$.next(filters);
  }

  /**
   * Simule une mise à jour de parcelle et recalcule la surface.
   */
  saveField(field: Field): Observable<Field> {
    const updated = { ...field, surfaceHa: this.geoService.calculateAreaHa(field.geom) };
    const fields = this.fields$.value.map((existing) => (existing.id === field.id ? updated : existing));
    this.fields$.next(fields);
    return of(updated);
  }

  /**
   * Ajoute une pièce jointe à la parcelle ciblée.
   */
  addAttachment(fieldId: string, attachment: NonNullable<Field['attachments']>[number]): Observable<Field> {
    const field = this.fields$.value.find((item) => item.id === fieldId);
    if (!field) {
      return throwError(() => new Error(`Field ${fieldId} not found`));
    }
    const attachments = [...(field.attachments ?? []), attachment];
    return this.saveField({ ...field, attachments });
  }

  /**
   * Retourne des statistiques agrégées basées sur les filtres courants.
   */
  getStats(): Observable<{ total: number; surface: number; bio: number }> {
    return this.getFilteredFields().pipe(
      map((fields) => ({
        total: fields.length,
        surface: Number(fields.reduce((sum, field) => sum + field.surfaceHa, 0).toFixed(2)),
        bio: fields.filter((field) => field.modeProduction === 'bio').length
      }))
    );
  }

  private applyFilters(fields: Field[], filters: FieldFilters): Field[] {
    const normalizedSearch = filters.search?.trim().toLowerCase();
    return fields.filter((field) => {
      const matchesSearch = normalizedSearch
        ? field.nom.toLowerCase().includes(normalizedSearch) ||
          (field.codeInterne?.toLowerCase().includes(normalizedSearch) ?? false)
        : true;
      const matchesStatus = filters.statut && filters.statut.length > 0 ? filters.statut.includes(field.statut) : true;
      const matchesMode =
        filters.modeProduction && filters.modeProduction.length > 0 ? filters.modeProduction.includes(field.modeProduction) : true;
      return matchesSearch && matchesStatus && matchesMode;
    });
  }
}
