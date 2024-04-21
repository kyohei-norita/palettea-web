import {Routes} from "@angular/router";
import {TopPageComponent} from "./top-page.component";

export const TopPageRoutes: Routes = [
  {
    path: '',
    component: TopPageComponent,
    children: [
      {
        path: 'color-picker',
        loadChildren: () => import('../color-picker-page/color-picker-page-routes').then((m) => m.ColorPickerPageRoutes)
      },
      {
        path: 'paint-registration',
        loadChildren: () => import('../paint-registration-page/paint-registration-page-routes').then((m) => m.PaintRegistrationPageRoutes)
      },
    ]
  },

];
