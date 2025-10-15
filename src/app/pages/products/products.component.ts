import { Component } from '@angular/core';

interface Product {
  name: string;
  stock: number;
  unit: string;
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  displayedColumns = ['name', 'stock', 'unit'];
  products: Product[] = [
    { name: 'Engrais', stock: 45, unit: 'sacs' },
    { name: 'Semence blé', stock: 20, unit: 'sacs' },
    { name: 'Phytosanitaire', stock: 8, unit: 'bidons' }
  ];
}
