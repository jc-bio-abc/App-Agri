import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import type { Attachment } from '../../models/field.models';

@Component({
  selector: 'app-field-attachments',
  templateUrl: './field-attachments.component.html',
  styleUrls: ['./field-attachments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldAttachmentsComponent {
  @Input() attachments: Attachment[] | null = null;
  @Output() readonly addAttachment = new EventEmitter<void>();

  trackById(_index: number, attachment: Attachment): string {
    return attachment.id;
  }
}
