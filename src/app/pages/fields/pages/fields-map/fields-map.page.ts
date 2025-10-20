import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import type { Field } from '../../models/field.models';
import { FieldsService } from '../../services/fields.service';
import { FieldsGeoService } from '../../services/fields-geo.service';

@Component({
  selector: 'app-fields-map-page',
  templateUrl: './fields-map.page.html',
  styleUrls: ['./fields-map.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsMapPageComponent implements AfterViewInit, OnDestroy {
  private map?: L.Map;
  private layers: Record<string, L.Layer> = {};
  private subscription?: Subscription;

  constructor(
    private readonly fieldsService: FieldsService,
    private readonly geoService: FieldsGeoService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.map = L.map('fields-map', {
      center: [43.602, 1.21],
      zoom: 14
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.subscription = this.fieldsService.getFilteredFields().subscribe((fields) => {
      Object.values(this.layers).forEach((layer) => layer.remove());
      this.layers = {};
      fields.forEach((field) => this.drawField(field));
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.map?.remove();
  }

  private drawField(field: Field): void {
    if (!this.map) {
      return;
    }
    if (this.layers[field.id]) {
      this.layers[field.id].remove();
    }
    const layerGroup = L.layerGroup();
    const polygon = L.geoJSON(field.geom, {
      style: () => ({ color: field.isLockedGeom ? '#2e7d32' : '#ff9800', weight: 2 })
    });
    polygon.on('click', () => {
      this.geoService
        .toggleLock(field.id, field.isLockedGeom)
        .pipe(
          take(1),
          switchMap((lockState) => this.fieldsService.saveField({ ...field, isLockedGeom: lockState }))
        )
        .subscribe((updated) => {
          this.snackBar.open(
            `${updated.nom} verrouillage: ${updated.isLockedGeom ? 'activé' : 'désactivé'} (${updated.surfaceHa} ha)`,
            'Fermer',
            {
              duration: 2500
            }
          );
        });
    });
    polygon.addTo(layerGroup);
    const centroid = this.geoService.getCentroid(field.geom);
    L.marker([centroid[1], centroid[0]], { title: field.nom }).addTo(layerGroup);
    layerGroup.addTo(this.map);
    this.layers[field.id] = layerGroup;
  }
}
