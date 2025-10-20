import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';

export type MinimalFile = Pick<File, 'name' | 'text'>;

import type { Field } from '../models/field.models';
import { FieldsService } from './fields.service';

/**
 * Service d'import mock : parse de petits jeux de données et hydratation du store local.
 */
@Injectable({ providedIn: 'root' })
export class ImportsService {
  constructor(private readonly fieldsService: FieldsService) {}

  /**
   * Simule l'import d'un fichier (CSV ou GeoJSON minimal).
   */
  importFields(file: File | MinimalFile): Observable<number> {
    // Dans ce mock on se contente de retourner un compteur fictif pour afficher un snackbar.
    console.info('Import mock', file.name);
    return of(2);
  }

  /**
   * Permet d'insérer des champs depuis une API en mémoire.
   */
  importFromApi(fields: Field[]): Observable<Field[]> {
    if (fields.length === 0) {
      return of([]);
    }

    const saves = fields.map((field) => this.fieldsService.saveField(field));
    return forkJoin(saves);
  }
}
