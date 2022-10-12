import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Flavour } from './flavour';
import environment from '../../../config/environment.json';

@Injectable({
  providedIn: 'root'
})
export class FlavourService {

  constructor(private http: HttpClient) {
  }

  getFlavours(name?: string): Observable<Flavour[]> {
    let queryParams = new HttpParams();
    if (name !== undefined) {
      queryParams = queryParams.append("name", name.toString());
    }
    return this.http.get<Flavour[]>(environment.backendUrl + 'flavours', { params: queryParams }).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getFlavour(id: number): Observable<Flavour> {
    return this.http.get<Flavour>(environment.backendUrl + 'flavours/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  createFlavour(flavour: Flavour): Observable<Flavour> {
    return this.http.post<Flavour>(environment.backendUrl + 'flavours', flavour).pipe(catchError((err) => {
      return throwError(err);
    }));
  }

  deleteFlavour(id: number): Observable<{}> {
    return this.http.delete<Flavour>(environment.backendUrl + 'flavours/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  editFlavour(flavour: Flavour): Observable<{}> {
    return this.http.put<Flavour>(environment.backendUrl + 'flavours', flavour).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}