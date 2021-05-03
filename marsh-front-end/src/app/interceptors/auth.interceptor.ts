import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Router} from '@angular/router'
import {CookieService} from 'ngx-cookie'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = this.cookieService.get('creospan-token')

   // console.log(request )

    if (request.headers.get('Anonymous') !== 'undefined') {
      if (jwtToken) {
        const cloned = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${jwtToken}`)
        })
        return next.handle(cloned)
      } /*else {
        alert('Your token has expired. Please login.')
        this.router.navigate(['login'])
      }*/
    } else { // Bypass all request where we do not need to pass token. e.g. login page.
      request.headers.delete('Anonymous')
      return next.handle(request)
    }
  }
}
