import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface FieldActionFormValue {
  readonly action: string;
  readonly date: string;
  readonly notes: string;
}

type FieldActionFormGroup = FormGroup<{
  action: FormControl<string>;
  date: FormControl<string>;
  notes: FormControl<string>;
}>;

@Component({
  selector: 'app-field-actions-form',
  templateUrl: './field-actions-form.component.html',
  styleUrls: ['./field-actions-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldActionsFormComponent {
  @Output() readonly submitted = new EventEmitter<FieldActionFormValue>();

  readonly form: FieldActionFormGroup = new FormGroup({
    action: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    notes: new FormControl('', { nonNullable: true })
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
    this.form.reset({ action: '', date: '', notes: '' });
  }
}
