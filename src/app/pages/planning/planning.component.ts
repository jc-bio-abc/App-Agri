import { Component } from '@angular/core';

interface PlanningItem {
  task: string;
  date: string;
  status: 'todo' | 'doing' | 'done';
}

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent {
  displayedColumns = ['task', 'date', 'status'];
  dataSource: PlanningItem[] = [
    { task: 'FIELDS.SPRAY', date: '2024-04-12', status: 'todo' },
    { task: 'FIELDS.SOW', date: '2024-04-20', status: 'doing' },
    { task: 'FIELDS.HARVEST', date: '2024-05-05', status: 'done' }
  ];
}
