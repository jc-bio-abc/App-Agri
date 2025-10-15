import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import type { Field } from '../models/field.models';

type FieldFeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, {
  id: string;
  nom: string;
  statut: Field['statut'];
  mode: Field['modeProduction'];
  surfaceHa: number;
}>;

/**
 * Service frontal responsable des exports fichiers.
 */
@Injectable({ providedIn: 'root' })
export class ExportsService {
  /**
   * Simule un export CSV en retournant la chaine générée.
   */
  exportCsv(fields: Field[]): Observable<string> {
    const header = 'id;nom;surface_ha;statut;mode_production';
    const rows = fields.map((field) => `${field.id};${field.nom};${field.surfaceHa};${field.statut};${field.modeProduction}`);
    return of([header, ...rows].join('\n'));
  }

  /**
   * Simule un export GeoJSON minimal.
   */
  exportGeoJson(fields: Field[]): Observable<FieldFeatureCollection> {
    const collection: FieldFeatureCollection = {
      type: 'FeatureCollection',
      features: fields.map((field) => ({
        type: 'Feature',
        properties: {
          id: field.id,
          nom: field.nom,
          statut: field.statut,
          mode: field.modeProduction,
          surfaceHa: field.surfaceHa
        },
        geometry: field.geom
      }))
    };

    return of(collection);
  }
}
