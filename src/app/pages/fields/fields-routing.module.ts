import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FieldsListPage } from './pages/fields-list/fields-list.page';
import { FieldsMapPage } from './pages/fields-map/fields-map.page';
import { FieldDetailPage } from './pages/field-detail/field-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FieldsListPage
  },
  {
    path: 'carte',
    component: FieldsMapPage
  },
  {
    path: ':id',
    component: FieldDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldsRoutingModule {}
