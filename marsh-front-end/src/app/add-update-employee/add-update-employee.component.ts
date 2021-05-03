import {Component, OnChanges, OnInit} from '@angular/core'
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
export class AddUpdateEmployeeComponent implements OnInit {
  flag: boolean
  empId: string

  employeeFormGroup: FormGroup

  constructor(private appService: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.empId = this.activatedRoute.snapshot.params.id
    console.log("emp id", this.empId)

    if (this.empId) {
      this.store.select(selectEmployee, {id: this.empId}).subscribe((result) => {
        if (!result) {
          const empsData: EmployeeModel[] = this.appService.getEmployeesFromLocalStorage();
          empsData && this.store.dispatch(retrieveEmployees())
        }
        if (result) {
          this.employeeFormGroup = new FormGroup({
            name: new FormControl(result['name'] || ''),
            address: new FormControl(result['address'] || ''),
            mobile: new FormControl(result['mobile'] || ''),
            email: new FormControl(result['email'] || '')
          })
        }

      })
    }else {
      this.employeeFormGroup=this.formBuilder.group({
        name:[''],
        address:[''],
        mobile:[''],
        email:['']
      })
    }
  }

  addEmployee() {
    if (this.empId) {
      this.store.dispatch(updateEmployee({id:this.empId,data:this.employeeFormGroup.value}));
      this.flag = true

    } else {
      this.store.dispatch(addEmployee({data:this.employeeFormGroup.value}))
    }
  }

}
