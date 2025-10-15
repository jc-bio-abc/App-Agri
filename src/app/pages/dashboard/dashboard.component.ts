import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  widgets = [
    { icon: 'map', label: 'NAV.FIELDS', value: 12 },
    { icon: 'task', label: 'NAV.ACTIVITIES', value: 7 },
    { icon: 'event', label: 'NAV.PLANNING', value: 5 }
  ];
}
