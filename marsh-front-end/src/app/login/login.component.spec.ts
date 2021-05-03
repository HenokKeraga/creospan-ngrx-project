import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LoginComponent} from './login.component'
import {UserService} from '../service/user.service'
import {Router} from '@angular/router'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let userService: jasmine.SpyObj<UserService>
  let mockRouter

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
    userService = jasmine.createSpyObj('userService', ['saveToken', 'getUserDetail', 'saveUserDetail'])
    // userService.saveToken.and.returnValue(of(null))
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide: UserService, useValue: userService},
        {provide: Router, useValue: mockRouter},
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
