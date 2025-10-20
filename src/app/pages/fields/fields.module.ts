import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FieldActionsFormComponent } from './components/field-actions-form/field-actions-form.component';
import { FieldFiltersComponent } from './components/field-filters/field-filters.component';
import { FieldDetailPageComponent } from './pages/field-detail/field-detail.page';
import { FieldsListPageComponent } from './pages/fields-list/fields-list.page';
import { FieldsMapPageComponent } from './pages/fields-map/fields-map.page';
import { FieldsRoutingModule } from './fields-routing.module';

@NgModule({
  declarations: [
    FieldActionsFormComponent,
    FieldFiltersComponent,
    FieldsListPageComponent,
    FieldsMapPageComponent,
    FieldDetailPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    FieldsRoutingModule
  ]
})
export class FieldsModule {}
