import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { FieldsRoutingModule } from './fields-routing.module';
import { FieldsListPage } from './pages/fields-list/fields-list.page';
import { FieldsMapPage } from './pages/fields-map/fields-map.page';
import { FieldDetailPage } from './pages/field-detail/field-detail.page';
import { FieldFiltersComponent } from './components/field-filters/field-filters.component';
import { FieldStatsComponent } from './components/field-stats/field-stats.component';
import { FieldTimelineComponent } from './components/field-timeline/field-timeline.component';
import { FieldActionsFormComponent } from './components/field-actions-form/field-actions-form.component';
import { FieldAttachmentsComponent } from './components/field-attachments/field-attachments.component';
import { FieldJournalComponent } from './components/field-journal/field-journal.component';

@NgModule({
  declarations: [
    FieldsListPage,
    FieldsMapPage,
    FieldDetailPage,
    FieldFiltersComponent,
    FieldStatsComponent,
    FieldTimelineComponent,
    FieldActionsFormComponent,
    FieldAttachmentsComponent,
    FieldJournalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule,
    FieldsRoutingModule
  ]
})
export class FieldsModule {}
