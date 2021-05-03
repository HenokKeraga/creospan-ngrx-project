import {TestBed} from '@angular/core/testing'

import {UserService} from './user.service'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {CookieService} from 'ngx-cookie'
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'

export const randomToken = () => Math.ceil(Math.random() * 100) + 'x'

describe('UserService', () => {
  const token = randomToken()
  let service: UserService
  let fakeCookieService = null
  let mockRouter

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }

    fakeCookieService = {
      get() {
        return token
      },
      removeAll: jasmine.createSpy('removeAll')
    }

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        UserService,
        {provide: CookieService, useValue: fakeCookieService},
        {provide: Router, useValue: mockRouter},
      ]
    })
    service = TestBed.inject(UserService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
