import { Component } from '@angular/core';

interface SeedLot {
  variety: string;
  quantity: number;
  year: number;
}

@Component({
  selector: 'app-seeds-page',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.scss']
})
export class SeedsComponent {
  lots: SeedLot[] = [
    { variety: 'Blé tendre', quantity: 15, year: 2024 },
    { variety: 'Maïs hybride', quantity: 10, year: 2023 },
    { variety: 'Colza', quantity: 8, year: 2024 }
  ];
}
