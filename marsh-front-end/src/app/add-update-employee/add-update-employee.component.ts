import {Component, OnChanges, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {EmployeeService} from '../service/employee.service'
import {ActivatedRoute} from '@angular/router'
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {selectEmployee} from "../state/app.selector";

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.css']
})
export class AddUpdateEmployeeComponent implements OnInit ,OnChanges {
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
    console.log("emp id",this.empId)
    if (this.empId) {
      this.store.select(selectEmployee, {id: this.empId}).subscribe((result) => {
        this.employeeFormGroup = new FormGroup({
          name: new FormControl(result['name']),
          address: new FormControl(result['address']),
          mobile: new FormControl(result['mobile']),
          email: new FormControl(result['email'])
        })
      })
    }

  }
  ngOnChanges() {
    this.empId = this.activatedRoute.snapshot.params.id
    if (this.empId) {
      this.store.select(selectEmployee, {id: this.empId}).subscribe((result) => {
        this.employeeFormGroup = new FormGroup({
          name: new FormControl(result['name']),
          address: new FormControl(result['address']),
          mobile: new FormControl(result['mobile']),
          email: new FormControl(result['email'])
        })
      })
    }
  }


  addEmployee() {
    if (this.empId) {
      this.appService.updateEmployee(this.empId, this.employeeFormGroup.value).subscribe((result) => {
        this.flag = true
        this.employeeFormGroup.reset({})
      })
    } else {
      this.appService.addEmployee(this.employeeFormGroup.value).subscribe((result) => {
        this.flag = true
        this.employeeFormGroup.reset({})
      })
    }
  }

}
