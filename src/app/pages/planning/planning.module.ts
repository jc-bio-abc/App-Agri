import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningComponent } from './planning.component';

@NgModule({
  declarations: [PlanningComponent],
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, TranslateModule, PlanningRoutingModule]
})
export class PlanningModule {}
