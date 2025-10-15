import { Component } from '@angular/core';

interface Activity {
  name: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'done';
}

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  activities: Activity[] = [
    { name: 'FIELDS.SOW', assignee: 'Alice', status: 'done' },
    { name: 'FIELDS.SPRAY', assignee: 'Bruno', status: 'in-progress' },
    { name: 'FIELDS.IRRIGATE', assignee: 'Claire', status: 'pending' }
  ];
}
