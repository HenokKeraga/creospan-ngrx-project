import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ListEmployeeComponent} from './list-employee.component'
import {DebugElement} from '@angular/core'
import {EmployeeService} from '../service/employee.service'
import {of} from 'rxjs'

describe('ListEmployeeComponent', () => {
  let employeeComponent: ListEmployeeComponent
  let fixture: ComponentFixture<ListEmployeeComponent>

  const data = [
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

  let debugElement: DebugElement
  let nativeElement: HTMLElement
  let appService: jasmine.SpyObj<EmployeeService>

  beforeEach(async () => {
    appService = jasmine.createSpyObj('appService', ['getEmployeeList'])
    appService.getEmployeeList.and.returnValue(of(data))

    await TestBed.configureTestingModule({
      declarations: [ListEmployeeComponent],
      providers: [ // providers
        {provide: EmployeeService, useValue: appService}
      ],
      imports: [] // modules
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeeComponent)
    nativeElement = fixture.debugElement.nativeElement as HTMLElement
    employeeComponent = fixture.componentInstance
    debugElement = fixture.debugElement
    fixture.detectChanges()
    expect(appService.getEmployeeList).toHaveBeenCalled()
  })

  it('should create', () => {
    expect(employeeComponent).toBeTruthy()
  })
})
