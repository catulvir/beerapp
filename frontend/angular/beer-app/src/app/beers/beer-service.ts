import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Beer } from './beer';
import environment from '../../../config/environment.json';
import { BeerSearchObject } from './beer-search-object';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(private http: HttpClient) {
  }

  getBeers(bso?: BeerSearchObject): Observable<Beer[]> {
    let queryParams = this.constructQueryParams(bso);

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

  private constructQueryParams(bso: BeerSearchObject | undefined) {
    let queryParams = new HttpParams();

    if (bso?.name !== undefined && bso?.name !== null) {
      queryParams = queryParams.append("name", bso.name);
    }
    if (bso?.isCraft !== undefined && bso?.isCraft !== null) {
      queryParams = queryParams.append("isCraft", bso.isCraft);
    }
    if (bso?.beerType !== undefined && bso?.beerType !== null) {
      queryParams = queryParams.append("beerTypeName", bso.beerType?.name!);
    }
    if (bso?.originCountry !== undefined && bso?.originCountry !== null) {
      queryParams = queryParams.append("originCountryName", bso.originCountry?.name!);
    }
    if (bso?.manufacturer !== undefined && bso?.manufacturer !== null) {
      queryParams = queryParams.append("manufacturerName", bso.manufacturer?.name!);
    }
    return queryParams;
  }
}