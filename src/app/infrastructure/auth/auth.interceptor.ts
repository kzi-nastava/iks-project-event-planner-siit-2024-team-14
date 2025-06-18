import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('skip')) {
      const token = this.authService.getToken();
      return next.handle(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
    }

    return next.handle(req.clone({
      headers: req.headers.delete('skip'),
    }));
  }
}
