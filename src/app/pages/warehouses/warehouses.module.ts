import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

import { WarehousesRoutingModule } from './warehouses-routing.module';
import { WarehousesComponent } from './warehouses.component';

@NgModule({
  declarations: [WarehousesComponent],
  imports: [CommonModule, MatTableModule, MatBadgeModule, TranslateModule, WarehousesRoutingModule]
})
export class WarehousesModule {}
