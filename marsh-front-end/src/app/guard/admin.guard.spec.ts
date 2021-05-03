import {TestBed} from '@angular/core/testing'

import {AdminGuard} from './admin.guard'
import {UserService} from '../service/user.service'
import {Router} from '@angular/router'

describe('AdminGuard', () => {
  let guard: AdminGuard
  let userService: jasmine.SpyObj<UserService>
  let mockRouter

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
    userService = jasmine.createSpyObj('userService', ['reisterUser'])
   // userService.registerUser.and.returnValue(of(data))
    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: userService},
        {provide: Router, useValue: mockRouter},
      ],
    })
    guard = TestBed.inject(AdminGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
