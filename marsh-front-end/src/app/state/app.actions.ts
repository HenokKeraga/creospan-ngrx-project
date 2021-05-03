import {createAction, props} from "@ngrx/store";
import {EmployeeModel} from "../model/Employee.model";

const EMPLOYEE_LIST = '[EMPLOYEE PAGE] LIST OF EMPLOYEE'
const EMPLOYEE_LIST_SUCCESS = '[EMPLOYEE PAGE] LIST OF EMPLOYEE SUCCESS'
const UPDATE_EMPLOYEE = '[EMPLOYEE PAGE] UPDATE EMPLOYEE '
const UPDATE_EMPLOYEE_SUCCESS = '[EMPLOYEE PAGE] UPDATE EMPLOYEE SUCCESS '
const ADD_EMPLOYEE = '[EMPLOYEE PAGE] ADD EMPLOYEE '
const ADD_EMPLOYEE_SUCCESS = '[EMPLOYEE PAGE] ADD EMPLOYEE SUCCESS '

export const retrieveEmployees = createAction(EMPLOYEE_LIST)
export const retrieveEmployeesSuccess = createAction(EMPLOYEE_LIST_SUCCESS, props<{ employees:EmployeeModel[] }>())
export const updateEmployee=createAction(UPDATE_EMPLOYEE,props<{id:string,data:EmployeeModel}>())
export const updateEmployeeSuccess=createAction(UPDATE_EMPLOYEE_SUCCESS,props<{emp:EmployeeModel}>())
export const addEmployee=createAction(ADD_EMPLOYEE,props<{data:EmployeeModel}>())
export const addEmployeeSuccess=createAction(ADD_EMPLOYEE_SUCCESS,props<{emp:EmployeeModel}>())

