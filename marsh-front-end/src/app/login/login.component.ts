import {Component, OnInit} from '@angular/core'
import {UserService} from '../service/user.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logInHandler() {
    this.userService.getAuthToken(this.email, this.password).subscribe((result) => {
      if (result.length > 0) { // In reality it will always return one JWT token bases ont he user/password.
        this.userService.saveToken(result[0].token)
        this.userService.getUserDetail(result[0].token).subscribe((loginedInUser) => {
          this.userService.userDetailsCache.next(loginedInUser[0])
          this.userService.saveUserDetail(loginedInUser)
          this.router.navigate(['list'])
        })
      } else {
        console.log('No user exist')
      }
    })
  }
}
