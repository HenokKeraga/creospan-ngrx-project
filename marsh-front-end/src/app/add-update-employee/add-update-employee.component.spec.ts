import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AddUpdateEmployeeComponent} from './add-update-employee.component'
import {ReactiveFormsModule} from '@angular/forms'
import {EmployeeService} from '../service/employee.service'
import {of} from 'rxjs'
import {ActivatedRoute} from '@angular/router'

describe('AddUpdateEmployeeComponent', () => {
  let component: AddUpdateEmployeeComponent
  let fixture: ComponentFixture<AddUpdateEmployeeComponent>
  let employeeService: jasmine.SpyObj<EmployeeService>


  const data = {
    id: 1,
    name: 'Aaron',
    address: 'Chicago IL',
    mobile: '11111111',
    email: 'test1@test1.com'
  }

  beforeEach(async () => {
    employeeService = jasmine.createSpyObj('employeeService', ['getEmployeeByID', 'updateEmployee'])
    employeeService.getEmployeeByID.and.returnValue(of(data))
    employeeService.updateEmployee.and.returnValue(of(data))

    await TestBed.configureTestingModule({
      declarations: [AddUpdateEmployeeComponent],
      providers: [ // providers
        {provide: EmployeeService, useValue: employeeService},
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {params: of({id: 123})}
          }
        }
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateEmployeeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
