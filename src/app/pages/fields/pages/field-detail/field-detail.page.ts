import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface FieldDetail {
  readonly id: number;
  readonly name: string;
  readonly crop: string;
  readonly area: number;
  readonly status: 'ready' | 'sowing' | 'harvest';
  readonly description: string;
}

@Component({
  selector: 'app-field-detail-page',
  templateUrl: './field-detail.page.html',
  styleUrls: ['./field-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldDetailPageComponent {
  private readonly fields: readonly FieldDetail[] = [
    {
      id: 1,
      name: 'Ferme Nord',
      crop: 'CROPS.WHEAT',
      area: 12.4,
      status: 'ready',
      description: 'FIELD.DESCRIPTION.FERME_NORD'
    },
    {
      id: 2,
      name: 'Prairie Est',
      crop: 'CROPS.CORN',
      area: 8.1,
      status: 'sowing',
      description: 'FIELD.DESCRIPTION.PRAIRIE_EST'
    },
    {
      id: 3,
      name: 'Verger Sud',
      crop: 'CROPS.BARLEY',
      area: 5.6,
      status: 'harvest',
      description: 'FIELD.DESCRIPTION.VERGER_SUD'
    }
  ];

  readonly field: FieldDetail | undefined;

  constructor(route: ActivatedRoute) {
    const fieldId = Number(route.snapshot.paramMap.get('id'));
    this.field = this.fields.find(item => item.id === fieldId);
  }
}
