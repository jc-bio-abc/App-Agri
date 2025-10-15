import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-stats',
  templateUrl: './field-stats.component.html',
  styleUrls: ['./field-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldStatsComponent {
  @Input() total = 0;
  @Input() surface = 0;
  @Input() bio = 0;
}
