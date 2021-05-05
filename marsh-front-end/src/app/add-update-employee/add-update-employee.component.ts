import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {EmployeeService} from '../service/employee.service'
import {ActivatedRoute} from '@angular/router'
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {selectEmployee} from "../state/app.selector";
import {EmployeeModel} from "../model/Employee.model";
import {addEmployee, retrieveEmployees, retrieveEmployeesSuccess, updateEmployee} from "../state/app.actions";

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.css']
})
export class AddUpdateEmployeeComponent implements OnInit, OnDestroy {
  flag: boolean
  empId: string

  employeeFormGroup: FormGroup

  constructor(private appService: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      console.log("data +++ " ,data);
      this.empId = data.get('id')
    })
    console.log("emp id", this.empId)
    if (this.empId) {
      console.log("emp id2 ", this.empId)
      this.store.select(selectEmployee, {id: this.empId}).subscribe((result) => {
        if (!result) {

          const empsData: EmployeeModel[] = this.appService.getEmployeesFromLocalStorage();
          empsData && this.store.dispatch(retrieveEmployees())
        }
        if (result) {
          console.log("emp id3 ", result['name'])
          this.employeeFormGroup = new FormGroup({
            name: new FormControl(result['name'] || ''),
            address: new FormControl(result['address'] || ''),
            mobile: new FormControl(result['mobile'] || ''),
            email: new FormControl(result['email'] || '')
          })
        }

      })
    } else {
      this.employeeFormGroup = this.formBuilder.group({
        name: [''],
        address: [''],
        mobile: [''],
        email: ['']
      })
    }
  }

  addEmployee() {
    console.log(" id +++", this.empId)

    if (this.empId) {
      console.log(" id +++", "if")
      this.store.dispatch(updateEmployee({id: this.empId, data: this.employeeFormGroup.value}));
      this.flag = true

    } else {
      console.log(" id +++", "else")
      this.store.dispatch(addEmployee({data: this.employeeFormGroup.value}))
    }
  }


  ngOnDestroy() {
    this.appService.removeEmployeesFromLocalStorage()
  }
}


