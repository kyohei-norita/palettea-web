import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
