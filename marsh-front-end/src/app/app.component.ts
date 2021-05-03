import {Component, OnInit} from '@angular/core'
import {UserService} from './service/user.service'
import {CookieService} from 'ngx-cookie'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userDetail: string

  constructor(private userService: UserService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.checkBrowser()
    this.userService.userDetailsCache.subscribe(userContext => {
      if (userContext) {
        this.userDetail = userContext
      }
    })

    if (localStorage.getItem('creospan-user')) {
      this.userService.userDetailsCache.next(JSON.parse(localStorage.getItem('creospan-user')))
    }
  }

  private checkBrowser() {
    const ua = window.navigator.userAgent
    const msie = ua.indexOf('MSIE ')

    if (msie > 0) {
      alert('This browser is not supported and the app may not work as expected. ' +
        'For a better experience please install the latest version of Chrome, Firefox, Internet Explorer, or Edge.')
    }
  }

  logoutHandler() {
    this.userService.logOut()
  }
}
