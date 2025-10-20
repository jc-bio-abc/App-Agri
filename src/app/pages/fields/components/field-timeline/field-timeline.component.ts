import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import type { FieldActivityEvent } from '../../models/activities.models';

@Component({
  selector: 'app-field-timeline',
  templateUrl: './field-timeline.component.html',
  styleUrls: ['./field-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldTimelineComponent {
  @Input() events: FieldActivityEvent[] | null = null;
  @Output() readonly activitySelected = new EventEmitter<string>();

  trackById(_index: number, event: FieldActivityEvent): string {
    return event.id;
  }
}
