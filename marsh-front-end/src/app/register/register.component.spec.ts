import {ComponentFixture, TestBed} from '@angular/core/testing'

import {RegisterComponent} from './register.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {UserService} from '../service/user.service'
import {of} from 'rxjs'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>

  const data = {
    name: 'test',
    password: 'test',
    email: 'test',
    id: 1
  }

  let userService: jasmine.SpyObj<UserService>

  beforeEach(async () => {
    userService = jasmine.createSpyObj('userService', ['reisterUser'])
    // userService.registerUser.and.returnValue(of(data))

    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: userService}
      ],
      imports: [HttpClientTestingModule],
      declarations: [RegisterComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
