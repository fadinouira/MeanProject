import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { UserService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth : UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getToken() ;
    const authReq = req.clone({
      headers : req.headers.set('Authorization',"fedi " + token)
    });

    return next.handle(authReq);
  }
}
