import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "./app.state";
import {log} from "util";

export const selectEmployeeState = createFeatureSelector<AppState>('app')
export const selectEmployees = createSelector(selectEmployeeState, state => state.employees)
export const selectEmployee = createSelector(selectEmployees, (employees, props) => {
  return employees.find(emp => emp.id == props.id)
})

