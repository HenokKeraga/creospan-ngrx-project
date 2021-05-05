import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {AddUpdateEmployeeComponent} from "./add-update-employee.component";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, Data, ParamMap} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {DebugElement} from "@angular/core";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {BrowserModule, By} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {AppState} from "../state/app.state";
import {selectEmployee} from "../state/app.selector";
import {addEmployee, addEmployeeSuccess, updateEmployee} from "../state/app.actions";
import {fn} from "@angular/compiler/src/output/output_ast";

describe('AddUpdateEmployeeComponent', () => {
    let fixture: ComponentFixture<AddUpdateEmployeeComponent>
    let component: AddUpdateEmployeeComponent
    let appService: any
    let debugElement: DebugElement
    let mockStore: MockStore
    let activatedRoute
    const employees =
      {
        "name": "rohit belay",
        "address": "Chicago IL",
        "mobile": "111111xZXzxz",
        "email": "test3@test3.com"
      }
    const employeesNew =
      {
        "name": "",
        "address": "",
        "mobile": "",
        "email": ""
      }

    const map = new Map()
    const myData = new BehaviorSubject(map)
    beforeEach(waitForAsync(() => {

      const activatedRouteStub = {
        paramMap: {
          subscribe: (fn: (value: Data) => void) => fn(
            myData.getValue()
          ),
        }
      }
      const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployeesFromLocalStorage', 'removeEmployeesFromLocalStorage'])


      TestBed.configureTestingModule({
        declarations: [AddUpdateEmployeeComponent],
        providers: [
          {provide: EmployeeService, useValue: employeeServiceSpy},
          {provide: ActivatedRoute, useValue: activatedRouteStub},
          provideMockStore()

        ],
        imports: [CommonModule, ReactiveFormsModule, BrowserModule]

      }).compileComponents().then(() => {
          fixture = TestBed.createComponent(AddUpdateEmployeeComponent)
          component = fixture.componentInstance
          debugElement = fixture.debugElement
          appService = TestBed.inject(EmployeeService)
          mockStore = TestBed.inject(MockStore)
          spyOn(mockStore, 'dispatch').and.callFake(() => {
          });
          mockStore.overrideSelector(selectEmployee, employees)
        }
      )

    }))

    it('should create the component ', () => {
      expect(component).toBeTruthy()
    });

    it('should updateEmployee action dispatched for updating Employee ', () => {
      const map = new Map()
      map.set('id', '1')
      myData.next(map)
      fixture.detectChanges()
      component.addEmployee()
      expect(mockStore.dispatch).toHaveBeenCalledWith(updateEmployee({id: '1', data: employees}))
    });
    it('should addEmployee action dispatched for adding Employee ', () => {
      const map = new Map()
      myData.next(map)
      fixture.detectChanges()
      component.addEmployee()
      expect(mockStore.dispatch).toHaveBeenCalledWith(addEmployee({data: employeesNew}))

    });

    it('should render an employee', () => {
        const map = new Map()
        map.set('id', '1')
        myData.next(map)
        fixture.detectChanges()
        let element = fixture.nativeElement.querySelector('h1')
        console.log(element.textContent)
        expect(element.textContent).toContain('Add/Update Employee')
        const data2 = debugElement.query(By.css("#name"))
        console.log(data2.nativeElement.value)
        expect(data2.nativeElement.value).toBe(employees.name)

      }
    );

    it('should submit the filled data when click button', function () {

      expect(true).toBe(true)

    });


  }
)

