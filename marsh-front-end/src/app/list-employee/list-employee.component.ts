import {Component, OnInit} from '@angular/core'
import {EmployeeService} from '../service/employee.service'
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {selectEmployees} from "../state/app.selector";
import {retrieveEmployees} from "../state/app.actions";
import {Observable} from "rxjs";
import {EmployeeModel} from "../model/Employee.model";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  public employees: Observable<EmployeeModel []>

  constructor(private appService: EmployeeService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  deleteEmployee(id: any) {

    this.appService.deleteEmployee(id).subscribe((result) => {
      this.getEmployeeList()
      console.log('Employee Deleted.') // fetch employee list again.
    })
  }

  getEmployeeList() {

    this.appService.getEmployeeList().subscribe((result) => {
      this.store.dispatch(retrieveEmployees( {employees:result}))
      this.appService.saveToLocalStorage(result);
    }) // data from server and put it in store using action and reducer


    this.employees=this.store.select(selectEmployees); // get data from store
  }
}
