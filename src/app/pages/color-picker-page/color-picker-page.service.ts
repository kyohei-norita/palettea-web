import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {RGB, Table, TableCellType, TableRow} from "palettea-ui";
import {diff, rgb_to_lab, RGBColor} from "color-diff";
import {environment} from "../../../environments/environment";

type PaintData = {
  id: string,
  name: string,
  rgb: RGBColor
}

export type ClosestPaint = {
  id: string,
  name: string,
  rgb: RGB,
  difference: number,
}

const closestPaint = (targetColor: RGBColor, paint: PaintData): ClosestPaint => {
  return {
    id: paint.id,
    name: paint.name,
    rgb: {
      r: paint.rgb.R,
      g: paint.rgb.G,
      b: paint.rgb.B,
    },
    difference: diff(rgb_to_lab(targetColor), rgb_to_lab(paint.rgb)),
  }
}

const CLOSEST_PAINT_TABLE_KEYS = ['name', 'rgb', 'colorPreview', 'diff'] as const
type ClosestPaintTableKeys = typeof CLOSEST_PAINT_TABLE_KEYS

@Injectable({
  providedIn: 'root'
})
export class ColorPickerPageService {
  private baseUrl = environment.baseUrl;
  private readonly _http = inject(HttpClient)

  closestPaintTable(target: RGB): Observable<Table<ClosestPaintTableKeys>> {
    const color = {R: target.r, G: target.g, B: target.b} satisfies RGBColor
    return this._http
      .get<PaintData[]>(`${this.baseUrl}assets/paint-data.json`)
      .pipe(
        map(paintList => paintList.map(paint => closestPaint(color, paint))),
        map(paints => paints.sort(((a, b) => (a.difference - b.difference)))),
        map(toPaintTable)
      )
  }
}

const toPaintTable = (paints: ClosestPaint[]): Table<ClosestPaintTableKeys> => {
  return {
    headers: {
      name: {title: 'name'},
      rgb: {title: 'rgb'},
      colorPreview: {title: 'colorPreview'},
      diff: {title: 'diff'},
    },
    rows: paints.map(toPaintTableTableRow)
  }
}

const toPaintTableTableRow = (paint: ClosestPaint): TableRow<ClosestPaintTableKeys> => {
  return {
    name: {
      type: TableCellType.STRING,
      value: paint.name,
    },
    rgb: {
      type: TableCellType.STRING,
      value: `rgb(${paint.rgb.r},${paint.rgb.g},${paint.rgb.b})`,
    },
    colorPreview: {
      type: TableCellType.COLOR_PREVIEW,
      rgb: paint.rgb,
    },
    diff: {
      type: TableCellType.NUMBER,
      value: paint.difference,
    },
  }
}
