import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorPickerPageTemplateComponent, PaintTablePageTemplateComponent, RGB, Table} from "palettea-ui";
import {ColorPickerPageService} from "./color-picker-page.service";
import {concatMap, Subject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'pa-color-picker-page',
  standalone: true,
  imports: [CommonModule, ColorPickerPageTemplateComponent, PaintTablePageTemplateComponent],
  template: `
    <pal-color-picker-page-template
      (onColorPick)="pickedRGB$.next($event)"
    />
    <pal-paint-table-page-template
      *ngIf="closestPaintTable() !== undefined"
      [dataSource]="closestPaintTable()!"
    />
  `,
})
export class ColorPickerPageComponent implements OnInit {
  private readonly _colorPickerPageService = inject(ColorPickerPageService)
  private readonly _destroyRef = inject(DestroyRef)
  readonly closestPaintTable = signal<Table<['name', 'rgb', 'colorPreview', 'diff']> | undefined>(undefined)
  readonly pickedRGB$ = new Subject<RGB>()

  ngOnInit(): void {
    this.pickedRGB$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        concatMap(rgb => this._colorPickerPageService.closestPaintTable(rgb)),
      )
      .subscribe(closestPaintTable =>
        this.closestPaintTable.set(closestPaintTable)
      )
  }
}
