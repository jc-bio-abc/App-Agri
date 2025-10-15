import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import type { Activity, ActivityType } from '../../models/field.models';

@Component({
  selector: 'app-field-actions-form',
  templateUrl: './field-actions-form.component.html',
  styleUrls: ['./field-actions-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldActionsFormComponent implements OnInit {
  @Input() fieldId!: string;
  @Output() readonly activityCreated = new EventEmitter<Activity>();

  readonly types: ActivityType[] = ['semis', 'labour', 'pulverisation', 'recolte', 'autre'];

  readonly form = this.fb.nonNullable.group({
    type: ['semis' as ActivityType, Validators.required],
    datePrevue: ['', Validators.required],
    commentaire: ['']
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.fieldId) {
      throw new Error('FieldActionsFormComponent requires a fieldId input');
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const activity: Activity = {
      id: crypto.randomUUID(),
      fieldIds: [this.fieldId],
      status: 'planifiee',
      intrants: [],
      ...value
    };
    this.activityCreated.emit(activity);
    this.form.reset({ type: 'semis', datePrevue: '', commentaire: '' });
  }
}
