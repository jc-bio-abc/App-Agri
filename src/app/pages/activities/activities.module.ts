import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [CommonModule, MatListModule, MatChipsModule, ActivitiesRoutingModule]
})
export class ActivitiesModule {}
