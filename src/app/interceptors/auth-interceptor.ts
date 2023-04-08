import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Edit  the request and pass through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!(req.url.includes('login') || req.url.includes('register'))) {
      req = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('access-token')}`
        ),
      });
    }

    return next.handle(req);
  }
}
