import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorPickerPageTemplateComponent, PaintTablePageTemplateComponent, RGB, Table} from "palettea-ui";
import {ColorPickerPageService} from "./color-picker-page.service";
import {concatMap, map, Subject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
  PaintTablePageTemplateInput
} from "palettea-ui/stories/templates/paint-table-page-template/paint-table-page-template.component";
import {
  ColorPickerPageTemplateInput
} from "palettea-ui/stories/templates/color-picker-page-template/color-picker-page-template.component";

@Component({
  selector: 'pa-color-picker-page',
  standalone: true,
  imports: [CommonModule, ColorPickerPageTemplateComponent, PaintTablePageTemplateComponent],
  template: `
    <pal-color-picker-page-template
      [input]="colorPickerPageTemplateInput"
      (onColorPick)="pickedRGB$.next($event)"
    >
      <pal-paint-table-page-template
        *ngIf="paintTablePageTemplateInput() !== undefined"
        [input]="paintTablePageTemplateInput()!"
      />
    </pal-color-picker-page-template>

  `,
})
export class ColorPickerPageComponent implements OnInit {
  private readonly _colorPickerPageService = inject(ColorPickerPageService)
  private readonly _destroyRef = inject(DestroyRef)
  readonly colorPickerPageTemplateInput: ColorPickerPageTemplateInput = {pageTitle: 'Color Picker'}
  readonly paintTablePageTemplateInput = signal<PaintTablePageTemplateInput | undefined>(undefined)
  readonly pickedRGB$ = new Subject<RGB>()

  ngOnInit(): void {
    this.pickedRGB$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        concatMap(rgb => this._colorPickerPageService.closestPaintTable(rgb)),
        map(closestPaintTable => ({dataSource: closestPaintTable} satisfies PaintTablePageTemplateInput))
      )
      .subscribe(paintTablePageTemplateInput =>
        this.paintTablePageTemplateInput.set(paintTablePageTemplateInput)
      )
  }
}
