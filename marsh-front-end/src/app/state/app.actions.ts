import {createAction, props} from "@ngrx/store";
import {EmployeeModel} from "../model/Employee.model";

const EMPLOYEE_LIST = '[EMPLOYEE PAGE ] LIST OF EMPLOYEE'

export const retrieveEmployees = createAction(EMPLOYEE_LIST, props<{ employees:EmployeeModel[] }>())
export const retrieveEmployees2 = createAction(EMPLOYEE_LIST)
