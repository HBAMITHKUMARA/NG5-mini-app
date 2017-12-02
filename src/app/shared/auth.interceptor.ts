import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterCeptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted:    ' + request);
        return this.store.select('auth')
            .take(1)
            .switchMap((authState: fromAuth.State) => {
                const newRequest = request.clone({params: request.params.set('auth', authState.token)});
                return next.handle(newRequest);
            });
    }
}
