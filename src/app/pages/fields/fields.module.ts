import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FieldsRoutingModule } from './fields-routing.module';
import { FieldsComponent } from './fields.component';

@NgModule({
  declarations: [FieldsComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, FieldsRoutingModule]
})
export class FieldsModule {}
