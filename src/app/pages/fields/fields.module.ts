import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

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
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule,
    FieldsRoutingModule
  ]
})
export class FieldsModule {}
