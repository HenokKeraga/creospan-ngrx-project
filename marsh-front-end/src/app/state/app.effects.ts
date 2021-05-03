import {Actions, createEffect, ofType} from "@ngrx/effects";
import {retrieveEmployees, retrieveEmployees2} from "./app.actions";
import {exhaustMap, map, mergeMap, tap} from "rxjs/operators";
import {EmployeeService} from "../service/employee.service";

import {Injectable} from "@angular/core";

@Injectable()
export class AppEffects {

  constructor(private action$: Actions, private appServices: EmployeeService) {
  }

  loadEmployees = createEffect(() => this.action$.pipe(
    ofType(retrieveEmployees2), exhaustMap(() => {
      return this.appServices.getEmployeeList().pipe(map(data => retrieveEmployees({employees:data})))
    })
  ))


}
