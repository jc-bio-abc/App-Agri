import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'parcelles',
    loadChildren: () => import('./pages/fields/fields.module').then(m => m.FieldsModule)
  },
  {
    path: 'planification',
    loadChildren: () => import('./pages/planning/planning.module').then(m => m.PlanningModule)
  },
  {
    path: 'activites',
    loadChildren: () => import('./pages/activities/activities.module').then(m => m.ActivitiesModule)
  },
  {
    path: 'entrepots',
    loadChildren: () => import('./pages/warehouses/warehouses.module').then(m => m.WarehousesModule)
  },
  {
    path: 'produits',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'semences',
    loadChildren: () => import('./pages/seeds/seeds.module').then(m => m.SeedsModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
