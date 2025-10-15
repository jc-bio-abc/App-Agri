import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { WarehousesRoutingModule } from './warehouses-routing.module';
import { WarehousesComponent } from './warehouses.component';

@NgModule({
  declarations: [WarehousesComponent],
  imports: [CommonModule, MatTableModule, MatBadgeModule, WarehousesRoutingModule]
})
export class WarehousesModule {}
