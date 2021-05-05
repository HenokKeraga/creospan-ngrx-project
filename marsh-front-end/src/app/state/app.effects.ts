import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  retrieveEmployeesSuccess,
  retrieveEmployees,
  updateEmployee,
  updateEmployeeSuccess,
  addEmployee, addEmployeeSuccess
} from "./app.actions";
import {exhaustMap, map, mergeMap, tap} from "rxjs/operators";
import {EmployeeService} from "../service/employee.service";

import {Injectable} from "@angular/core";
import {EmployeeModel} from "../model/Employee.model";
import {Router} from "@angular/router";

@Injectable()
export class AppEffects {

  constructor(private action$: Actions, private appServices: EmployeeService,private router:Router) {
  }

  loadEmployees$ = createEffect(() => this.action$.pipe(
    ofType(retrieveEmployees), exhaustMap(() => {
      return this.appServices.getEmployeeList().pipe(map(data => {
        this.appServices.saveToLocalStorage(data)
        return retrieveEmployeesSuccess({employees:data})}))
    })
  ))

  updateEmployee$=createEffect(()=>{
    return this.action$.pipe(ofType(updateEmployee),mergeMap(action=>{
      return this.appServices.updateEmployee(action.id,action.data).pipe(map((employee:EmployeeModel)=>{
      //    this.router.navigate(['/list'])
          return updateEmployeeSuccess({emp:employee})
        }))
    }))
  },{dispatch:true})

  addEmployee$=createEffect(()=>{
    return this.action$.pipe(ofType(addEmployee),mergeMap(action=>{
      return this.appServices.addEmployee(action.data).pipe(map(employee=>{
        this.router.navigate(['/list'])
        return addEmployeeSuccess({emp:employee})
      }))
    }))
  },{dispatch:true})


}
