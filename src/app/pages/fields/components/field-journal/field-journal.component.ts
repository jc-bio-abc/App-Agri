import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface JournalEntry {
  id: string;
  date: string;
  author: string;
  message: string;
}

@Component({
  selector: 'app-field-journal',
  templateUrl: './field-journal.component.html',
  styleUrls: ['./field-journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldJournalComponent {
  @Input() entries: JournalEntry[] = [];

  trackById(_index: number, entry: JournalEntry): string {
    return entry.id;
  }
}
