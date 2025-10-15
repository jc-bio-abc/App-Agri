import { Injectable } from '@angular/core';
import type { MultiPolygon, Polygon } from 'geojson';
import { BehaviorSubject, Observable, of } from 'rxjs';

/**
 * Service responsable des calculs géospatiaux côté front.
 * Les algorithmes utilisés restent simples pour le mock mais sont documentés
 * pour faciliter le passage à une librairie dédiée (turf.js, proj4…).
 */
@Injectable({ providedIn: 'root' })
export class FieldsGeoService {
  private readonly lockState = new BehaviorSubject<Record<string, boolean>>({});

  /**
   * Calcule une surface en hectares à partir d'un polygone ou multipolygone.
   * Hypothèse: coordonnées en WGS84, calcul plan approximatif.
   */
  calculateAreaHa(geom: Polygon | MultiPolygon): number {
    const polygons = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    const areaM2 = polygons.reduce((acc, polygon) => acc + polygon.reduce((surface, ring) => surface + Math.abs(this.shoelaceArea(ring)), 0), 0);
    return Number((areaM2 / 10_000).toFixed(2));
  }

  /**
   * Retourne le centroïde approximatif du premier anneau du polygone.
   */
  getCentroid(geom: Polygon | MultiPolygon): [number, number] {
    const polygon = geom.type === 'Polygon' ? geom.coordinates[0] : geom.coordinates[0][0];
    const sum = polygon.reduce(
      (acc, [lng, lat]) => ({
        lng: acc.lng + lng,
        lat: acc.lat + lat
      }),
      { lng: 0, lat: 0 }
    );
    return [sum.lng / polygon.length, sum.lat / polygon.length];
  }

  /**
   * Modifie l'état de verrouillage d'une géométrie en mémoire.
   */
  toggleLock(fieldId: string, current: boolean): Observable<boolean> {
    const newState = !current;
    this.lockState.next({ ...this.lockState.value, [fieldId]: newState });
    return of(newState);
  }

  /**
   * Simule une persistance de géométrie et renvoie la surface recalculée.
   */
  updateGeometry(fieldId: string, geom: Polygon | MultiPolygon): Observable<number> {
    const area = this.calculateAreaHa(geom);
    this.lockState.next({ ...this.lockState.value, [fieldId]: true });
    return of(area);
  }

  /**
   * Retourne l'état de verrouillage connu pour la géométrie.
   */
  getLockState(fieldId: string): Observable<boolean | undefined> {
    return of(this.lockState.value[fieldId]);
  }

  private shoelaceArea(ring: number[][]): number {
    let area = 0;
    for (let i = 0; i < ring.length - 1; i++) {
      const [x1, y1] = ring[i];
      const [x2, y2] = ring[i + 1];
      area += x1 * y2 - x2 * y1;
    }
    return area / 2;
  }
}
