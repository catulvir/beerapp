import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Beer } from './beer';
import environment from '../../../config/environment.json';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(private http: HttpClient) {
  }

  getBeers(name?: string): Observable<Beer[]> {
    let queryParams = new HttpParams();
    if (name !== undefined) {
      queryParams = queryParams.append("name", name.toString());
    }
    return this.http.get<Beer[]>(environment.backendUrl + 'beers', { params: queryParams }).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getBeer(id: number): Observable<Beer> {
    return this.http.get<Beer>(environment.backendUrl + 'beers/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  createBeer(beer: Beer): Observable<Beer> {
    return this.http.post<Beer>(environment.backendUrl + 'beers', beer).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  deleteBeer(id: number): Observable<{}> {
    return this.http.delete<Beer>(environment.backendUrl + 'beers/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  editBeer(beer: Beer): Observable<{}> {
    return this.http.put<Beer>(environment.backendUrl + 'beers', beer).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}