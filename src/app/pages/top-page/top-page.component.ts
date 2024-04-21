import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopPageTemplateComponent} from "palettea-ui";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'pa-top-page',
  standalone: true,
  imports: [CommonModule, TopPageTemplateComponent, RouterOutlet],
  template: `
    <pal-top-page-template
      (onClickRegister)="toRegisterPage()"
      (onClickSearch)="toColorPickerPage()"
    >
      <router-outlet/>
    </pal-top-page-template>
  `,
})
export class TopPageComponent {
  private _router = inject(Router)
  toColorPickerPage() {
    this._router.navigateByUrl('top/color-picker').then();
  }
  toRegisterPage() {
    this._router.navigateByUrl('top/paint-registration').then();
  }
}
