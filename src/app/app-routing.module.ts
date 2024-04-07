import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'top',
    loadChildren: () => import('./pages/top-page/top-page-routes').then((m) => m.TopPageRoutes)
  },
  {
    path: 'color-picker',
    loadChildren: () => import('./pages/color-picker-page/color-picker-page-routes').then((m) => m.ColorPickerPageRoutes)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
