import { Component } from '@angular/core';

interface Warehouse {
  name: string;
  capacity: number;
  occupation: number;
}

@Component({
  selector: 'app-warehouses-page',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent {
  displayedColumns = ['name', 'capacity', 'occupation'];
  warehouses: Warehouse[] = [
    { name: 'Entrepôt Nord', capacity: 100, occupation: 45 },
    { name: 'Entrepôt Sud', capacity: 120, occupation: 100 },
    { name: 'Entrepôt Est', capacity: 80, occupation: 65 }
  ];

  getBadge(occupation: number, capacity: number): 'primary' | 'accent' | 'warn' {
    const ratio = occupation / capacity;
    if (ratio > 0.85) {
      return 'warn';
    }
    if (ratio > 0.6) {
      return 'accent';
    }
    return 'primary';
  }
}
