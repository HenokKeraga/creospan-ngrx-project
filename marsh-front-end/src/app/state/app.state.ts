import {EmployeeModel} from "../model/Employee.model";


export interface AppState {
  employees: EmployeeModel[]
}

export const initialState: AppState = {
  employees: []
}
