import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Manufacturer } from './manufacturer';
import environment from '../../../config/environment.json';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) {
  }

  getManufacturers(name?: string): Observable<Manufacturer[]> {
    let queryParams = new HttpParams();
    if (name !== undefined) {
      queryParams = queryParams.append("name", name.toString());
    }
    return this.http.get<Manufacturer[]>(environment.backendUrl + 'manufacturers', { params: queryParams }).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getManufacturer(id: number): Observable<Manufacturer> {
    return this.http.get<Manufacturer>(environment.backendUrl + 'manufacturers/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  createManufacturer(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.post<Manufacturer>(environment.backendUrl + 'manufacturers', manufacturer).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  deleteManufacturer(id: number): Observable<{}> {
    return this.http.delete<Manufacturer>(environment.backendUrl + 'manufacturers/' + id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  editManufacturer(manufacturer: Manufacturer): Observable<{}> {
    return this.http.put<Manufacturer>(environment.backendUrl + 'manufacturers', manufacturer).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}