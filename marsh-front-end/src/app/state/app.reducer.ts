import {createReducer, on} from "@ngrx/store";
import {initialState} from "./app.state";
import {retrieveEmployees} from "./app.actions";


const _appReducer = createReducer(initialState,
  on(retrieveEmployees, (state, action) => {
      console.log(action)
      return {...state, employees: action.employees}
    }
  )
)


export function appReducer(state, action) {

  return _appReducer(state, action)

}


export const allReducer = {
  app: appReducer
}
