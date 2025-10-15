import { Component } from '@angular/core';

@Component({
  selector: 'app-fields-page',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent {
  parcels = [
    { name: 'Ferme Nord', area: 12.4 },
    { name: 'Prairie Est', area: 8.1 },
    { name: 'Verger Sud', area: 5.6 }
  ];
}
