import {TestBed} from '@angular/core/testing'

import {AuthGuard} from './auth.guard'
import {UserService} from '../service/user.service'
import {Router} from '@angular/router'

describe('AuthGuard', () => {
  let guard: AuthGuard
  let userService: jasmine.SpyObj<UserService>
  let mockRouter

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
    userService = jasmine.createSpyObj('userService', ['isLogin'])
    // userService.isLogin.and.returnValue(of(data))
    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: userService},
        {provide: Router, useValue: mockRouter},
      ]
    })
    guard = TestBed.inject(AuthGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
