import {createReducer, on} from "@ngrx/store";
import {initialState} from "./app.state";
import {addEmployeeSuccess, retrieveEmployeesSuccess, updateEmployeeSuccess} from "./app.actions";
import {EmployeeModel} from "../model/Employee.model";


const _appReducer = createReducer(initialState,
  on(retrieveEmployeesSuccess, (state, action) => {
      return {...state, employees: action.employees}
    }
  ), on(updateEmployeeSuccess, (state, action) => {

    const modifiedEmployeesList: EmployeeModel[] = state.employees.filter(emp => emp.id !== action.emp.id)
    modifiedEmployeesList.push(action.emp)

    return {...state, employees: modifiedEmployeesList}
  }),
  on(addEmployeeSuccess, (state, action) => {

    return {...state,employees:[...state.employees,action.emp]}
  })
)


export function appReducer(state, action) {

  return _appReducer(state, action)

}


export const allReducer = {
  app: appReducer
}
