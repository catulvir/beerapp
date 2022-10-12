import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        let handled: boolean = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            switch (error.status) {
              case 0:
                return throwError(() => 'Unable to connect to the server! Try again soon!');
              case 400:
                return throwError(() => 'Failure on your end! Refresh and try again!');
              case 500:
                return throwError(() => 'Failure on server\'\s end! Try again soon!');
              //will add these cases when implement authorization
              /* case 401:      //login
                this.router.navigateByUrl("/login");
                console.log(`redirect to login`);
                handled = true;
                break;
              case 403:     //forbidden
                this.router.navigateByUrl("/login");
                console.log(`redirect to login`);
                handled = true;
                break; */
            }
          }
        }
        else {
          console.error("Other Errors");
        }
        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          console.log('throw error back to to the subscriber');
          return throwError(() => error); //right now questionable piece of code, will think about it after adding security
        }
      })
    )
  }
}
