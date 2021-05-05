import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "./app.state";


export const selectEmployeeState = createFeatureSelector<AppState>('app')
export const selectEmployees = createSelector(selectEmployeeState, state => {
  console.log("state",state)
    return state?.employees
  }
)
export const selectEmployee = createSelector(selectEmployees, (employees, props) => {
  console.log(employees)
  return employees?.find(emp => emp.id == props.id)
})

