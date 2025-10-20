import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FieldsRoutingModule } from './fields-routing.module';
import { FieldsListPageComponent } from './pages/fields-list/fields-list.page';
import { FieldsMapPageComponent } from './pages/fields-map/fields-map.page';
import { FieldDetailPageComponent } from './pages/field-detail/field-detail.page';
import { FieldFiltersComponent } from './components/field-filters/field-filters.component';
import { FieldStatsComponent } from './components/field-stats/field-stats.component';
import { FieldTimelineComponent } from './components/field-timeline/field-timeline.component';
import { FieldActionsFormComponent } from './components/field-actions-form/field-actions-form.component';
import { FieldAttachmentsComponent } from './components/field-attachments/field-attachments.component';
import { FieldJournalComponent } from './components/field-journal/field-journal.component';

@NgModule({
  declarations: [
    FieldsListPageComponent,
    FieldsMapPageComponent,
    FieldDetailPageComponent,
    FieldFiltersComponent,
    FieldStatsComponent,
    FieldTimelineComponent,
    FieldActionsFormComponent,
    FieldAttachmentsComponent,
    FieldJournalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatListModule,
    MatToolbarModule,
    FieldsRoutingModule
  ]
})
export class FieldsModule {}
