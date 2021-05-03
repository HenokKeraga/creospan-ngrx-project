import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable, Subject} from 'rxjs'
import {CookieService} from 'ngx-cookie'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetailsCache: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  USER_URL = 'http://localhost:3000/users'

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
  }

  registerUser(data): Observable<any> {
    return this.http.post(this.USER_URL, data)
  }

  getAuthToken(email: string, password: string): Observable<any> {
    // in reality it should only return Json token based on the email/password.
    // I'm passing dummy token so that this route can be ignored in interceptor.
    return this.http.get(`${this.USER_URL}?user=${email}&password=${password}`, {headers: {Anonymous: 'undefined'}})
  }

  getUserDetail(token): Observable<any> {
    return this.http.get(`${this.USER_URL}?token=${token}`)
  }

  isLogin(): boolean {
    return !!this.cookieService.get('creospan-token')
  }

  getUserRoles() {
    return this.userDetailsCache.getValue().roles
  }

  public saveUserDetail(loginedInUser) {
    localStorage.setItem('creospan-user', JSON.stringify(loginedInUser[0]))
  }

  public saveToken(token) {
    if (token) {
      this.cookieService.put('creospan-token', token)
    }
  }

  public logOut() {
    this.userDetailsCache.next({})
    this.cookieService.removeAll()
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
