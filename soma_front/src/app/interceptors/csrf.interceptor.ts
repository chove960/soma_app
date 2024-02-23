import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Logic to add CSRF token to request headers
        const csrfToken = 'your_csrf_token_here';
        const csrfReq = req.clone({ setHeaders: { 'X-CSRFToken': csrfToken } });
        return next.handle(csrfReq);
    }
}
