import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {UserService} from '../service/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  })

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.userService.registerUser(this.registerFormGroup.value).subscribe((result) => {
      alert('User register successfully')
    })
  }
}
