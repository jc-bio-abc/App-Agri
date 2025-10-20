import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [CommonModule, MatListModule, MatChipsModule, TranslateModule, ActivitiesRoutingModule]
})
export class ActivitiesModule {}
