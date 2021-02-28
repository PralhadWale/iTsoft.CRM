import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from "../_models";

const APP_USER_PROFILE = "IT_CRM_USER_DATA_1.0";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    
    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let user = <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
        if (user && user.isAuthenticated && user.Token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization","Bearer " + user.Token)
            });

            return next.handle(cloned).pipe(catchError(x=> this.handleAuthError(x)));
        }
        else {
            return next.handle(req).pipe(catchError(x=> this.handleAuthError(x)));
        }
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        console.log("In handleerror");
        if (err.status === 401 || err.status === 403) {
            //navigate /delete cookies or whatever
            localStorage.removeItem(APP_USER_PROFILE);
            this.router.navigateByUrl("login");
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(err);
    }


}