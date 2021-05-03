import {TestBed} from '@angular/core/testing'

import {AuthInterceptor} from './auth.interceptor'
import {Router} from '@angular/router'
import {CookieService} from 'ngx-cookie'

export const randomToken = () => Math.ceil(Math.random() * 100) + 'x'

describe('AuthInterceptor', () => {
  const token = randomToken()
  let fakeCookieService = null
  const mockRouter = {
    url: '/current-url',
    navigate: jasmine.createSpy('mockRouter.navigate')
  }

  beforeEach(() => {
    fakeCookieService = {
      get() {
        return token
      },
      removeAll: jasmine.createSpy('removeAll')
    }
  })

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor,
      {provide: Router, useValue: mockRouter},
      {provide: CookieService, useValue: fakeCookieService},
    ]
  }))

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor)
    expect(interceptor).toBeTruthy()
  })
})
