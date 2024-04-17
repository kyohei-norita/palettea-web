import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export type PageRegistrationInput = {
  name: string,
  manufacturerId: string,
  rgb: {
    r: number,
    g: number,
    b: number
  },
  coatingType: string
}

@Injectable({
  providedIn: 'root'
})
export class PageRegistrationPageService {
  private baseUrl = environment.baseUrl;
  private readonly _http = inject(HttpClient)

  register(): Observable<void> {
    return this._http.post<void>('/api/paint',
      {
        "name": "test name",
        "manufacturerId": "852ccffc-c1ac-4f9b-b8ef-8c8d14ce3645",
        "rgb": {
          "r": 200,
          "g": 100,
          "b": 50
        },
        "coatingType": "LACQUER"
      })
  }

}
