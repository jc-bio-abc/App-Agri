import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FieldLocation {
  readonly name: string;
  readonly coordinates: string;
}

@Component({
  selector: 'app-fields-map-page',
  templateUrl: './fields-map.page.html',
  styleUrls: ['./fields-map.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsMapPageComponent {
  readonly fieldLocations: readonly FieldLocation[] = [
    { name: 'Ferme Nord', coordinates: '48.8566, 2.3522' },
    { name: 'Prairie Est', coordinates: '45.7640, 4.8357' },
    { name: 'Verger Sud', coordinates: '43.6047, 1.4442' }
  ];
}
