import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BeerType } from './beer-type';
import environment from '../../../config/environment.json';

@Injectable({
  providedIn: 'root'
})
export class BeerTypeService {

  constructor(private http: HttpClient) {
  }

  getBeerTypes(name?: string): Observable<BeerType[]> {
    let queryParams = new HttpParams();
    if (name !== undefined) {
      queryParams = queryParams.append("name", name.toString());
    }
    return this.http.get<BeerType[]>(environment.backendUrl + 'beer-types', { params: queryParams }).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getBeerType(id: number): Observable<BeerType> {
    return this.http.get<BeerType>(environment.backendUrl + 'beer-types/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  createBeerType(beerType: BeerType): Observable<BeerType> {
    return this.http.post<BeerType>(environment.backendUrl + 'beer-types', beerType).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  deleteBeerType(id: number): Observable<{}> {
    return this.http.delete<BeerType>(environment.backendUrl + 'beer-types/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  editBeerType(beerType: BeerType): Observable<{}> {
    return this.http.put<BeerType>(environment.backendUrl + 'beer-types', beerType).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
