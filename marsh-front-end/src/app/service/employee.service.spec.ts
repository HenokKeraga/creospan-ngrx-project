import {TestBed} from '@angular/core/testing'

import {EmployeeService} from './employee.service'
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('AppService', () => {
  let appService: EmployeeService
  let httpMock: HttpTestingController

  const data = {
    employee: [
      {
        id: 1,
        name: 'Aaron',
        address: 'Chicago IL',
        mobile: '11111111',
        email: 'test1@test1.com'
      },
      {
        id: 2,
        name: 'Pat',
        address: 'Chicago IL',
        mobile: '22222222',
        email: 'test2@test2.com'
      },
      {
        id: 3,
        name: 'Jason',
        address: 'Chicago IL',
        mobile: '33333333',
        email: 'test3@test3.com'
      }
    ]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeService,
      ]
    })
    appService = TestBed.inject(EmployeeService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(appService).toBeTruthy()
  })

  it('getEmployeeList should call http client', () => {
    appService.getEmployeeList().subscribe(val => {
      expect(val).toEqual(data)
    })

    const request = httpMock.expectOne(appService.EMP_URL)
    expect(request.request.method).toEqual('GET')
    request.flush(data)
  })

})
