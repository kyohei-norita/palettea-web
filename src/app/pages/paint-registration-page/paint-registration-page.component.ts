import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Option, PaintRegistrationPageTemplateComponent} from "palettea-ui";
import {
  PaintRegistrationPageTemplateInput, PaintRegistrationPageTemplateOutput
} from "palettea-ui/stories/templates/paint-registration-page/paint-registration-page-template.component";
import {PageRegistrationPageService} from "./page-registration-page.service";

const COATING_TYPE_SELECT_OPTIONS: Option[] = [
  {
    label: 'ラッカー',
    value: 'LACQUER',
  },
  {
    label: 'アクリル',
    value: 'ACRYLIC',
  },
  {
    label: 'エナメル',
    value: 'ENAMEL',
  },
]

const PAINT_REGISTRATION_PAGE: PaintRegistrationPageTemplateInput = {
  pageTitle: 'Paint Registration',
  forms: {
    paintName: {
      label: 'paint name',
    },
    colorCode: {
      label: 'color code',
    },
    coatingType: {
      label: 'coating type',
      options: COATING_TYPE_SELECT_OPTIONS,
    },
  },
  buttonName: 'register',
}

@Component({
  selector: 'pa-paint-registration-page',
  standalone: true,
  imports: [CommonModule, PaintRegistrationPageTemplateComponent],
  template: `
    <pal-paint-registration-page-template
      [input]="paintRegistrationPageTemplateInput"
      (onClickRegisterButton)="onClickRegisterButton($event)"
    />
  `,
})
export class PaintRegistrationPageComponent {

  paintRegistrationPageTemplateInput = PAINT_REGISTRATION_PAGE
  private _paintRegistrationService = inject(PageRegistrationPageService)

  onClickRegisterButton(output: PaintRegistrationPageTemplateOutput) {
    this._paintRegistrationService.register().subscribe()
  }
}
