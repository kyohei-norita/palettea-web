import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'color-picker',
    loadChildren: () => import('./pages/color-picker-page/color-picker-page-routes').then((m) => m.ColorPickerPageRoutes)
  },
  {
    path: 'paint-registration',
    loadChildren: () => import('./pages/paint-registration-page/paint-registration-page-routes').then((m) => m.PaintRegistrationPageRoutes)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
