import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FieldsListPageComponent } from './pages/fields-list/fields-list.page';
import { FieldsMapPageComponent } from './pages/fields-map/fields-map.page';
import { FieldDetailPageComponent } from './pages/field-detail/field-detail.page';

// /parcelles est la route racine de ce module lazy (voir app-routing)
const routes: Routes = [
  { path: '', component: FieldsListPageComponent },
  { path: 'carte', component: FieldsMapPageComponent },
  { path: ':id', component: FieldDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldsRoutingModule {}
