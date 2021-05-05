import {EmployeeService} from "./employee.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";

describe("Employee service", () => {

  let data= {
    employee: [
      {
        "name": "rohit belay",
        "address": "Chicago IL",
        "mobile": "111111xZXzxz",
        "email": "test3@test3.com",
        "id": 3
      },
      {
        "name": "rohit",
        "address": "chicago2",
        "mobile": "4444",
        "email": "4@44.com",
        "id": 4
      },
      {
        "name": "Jason hen",
        "address": "Chicago IL123",
        "mobile": "33333333123",
        "email": "test3@test3.com123",
        "id": 5
      },
      {
        "name": "Pat2444",
        "address": "Chicago IL",
        "mobile": "22222222",
        "email": "test2@test2.com",
        "id": 6
      },
      {
        "name": "rihon",
        "address": "jh",
        "mobile": "465456564564",
        "email": "r@hgfhg.com",
        "id": 7
      },
      {
        "name": "Henok M keraga",
        "address": "skjdlksjDLK",
        "mobile": "6417811452",
        "email": "henokkeraga@gmail.com",
        "id": 8
      },
      {
        "name": "TEST",
        "address": "TESR",
        "mobile": "TEST@GMAIL.COM",
        "email": "henokkeraga@gmail.com",
        "id": 9
      },
      {
        "name": "SSS",
        "address": "SS",
        "mobile": "SSS",
        "email": "SS",
        "id": 10
      },
      {
        "name": "DDD",
        "address": "DDD",
        "mobile": "DD",
        "email": "ddddd",
        "id": 11
      }
    ]
  }

  let employeeService: EmployeeService
  let httpTestingController: HttpTestingController

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [EmployeeService],
      imports: [HttpClientTestingModule]

    })

    employeeService = TestBed.inject(EmployeeService)
    httpTestingController = TestBed.inject(HttpTestingController)


  })

  it('should retrieve all employees ', () => {
    employeeService.getEmployeeList().subscribe(
      employees => {
        expect(employees).toBeTruthy()
        console.log("employees",employees)
        expect(employees.length).toBe(9);
      }
    )

   httpTestingController.expectOne(employeeService.EMP_URL).flush(Object.values(data.employee))

  })

})
