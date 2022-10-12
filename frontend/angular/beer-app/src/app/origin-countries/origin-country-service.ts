import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OriginCountry } from './origin-country';
import environment from '../../../config/environment.json';

@Injectable({
  providedIn: 'root'
})
export class OriginCountryService {

  constructor(private http: HttpClient) {
  }

  getOriginCountries(name?: string): Observable<OriginCountry[]> {
    let queryParams = new HttpParams();
    if (name !== undefined) {
      queryParams = queryParams.append("name", name.toString());
    }
    return this.http.get<OriginCountry[]>(environment.backendUrl + 'origin-countries', { params: queryParams }).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getOriginCountry(id: number): Observable<OriginCountry> {
    return this.http.get<OriginCountry>(environment.backendUrl + 'origin-countries/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  createOriginCountry(originCountry: OriginCountry): Observable<OriginCountry> {
    return this.http.post<OriginCountry>(environment.backendUrl + 'origin-countries', originCountry).pipe(catchError((err) => {
      return throwError(() => err);
    })
    );
  }

  deleteOriginCountry(id: number): Observable<{}> {
    return this.http.delete<OriginCountry>(environment.backendUrl + 'origin-countries/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  editOriginCountry(originCountry: OriginCountry): Observable<{}> {
    return this.http.put<OriginCountry>(environment.backendUrl + 'origin-countries', originCountry).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}