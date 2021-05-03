import {TestBed} from '@angular/core/testing'
import {AppComponent} from './app.component'
import {UserService} from './service/user.service'
import {CookieService} from 'ngx-cookie'

export const randomToken = () => Math.ceil(Math.random() * 100) + 'x'

describe('AppComponent', () => {
  const token = randomToken()
  let fakeCookieService = null
  let userService: jasmine.SpyObj<UserService>

  beforeEach(async () => {
    fakeCookieService = {
      get() {
        return token
      },
      removeAll: jasmine.createSpy('removeAll')
    }

    userService = jasmine.createSpyObj('userService', ['reisterUser'])
    // userService.registerUser.and.returnValue(of(data))
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: UserService, useValue: userService},
        {provide: CookieService, useValue: fakeCookieService},
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
