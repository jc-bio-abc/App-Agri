import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldsComponent } from './fields.component';

const routes: Routes = [{ path: '', component: FieldsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldsRoutingModule {}
