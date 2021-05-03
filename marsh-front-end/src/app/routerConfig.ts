import {Route} from '@angular/router'
import {ListEmployeeComponent} from './list-employee/list-employee.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {HomeComponent} from './home/home.component'
import {AddUpdateEmployeeComponent} from './add-update-employee/add-update-employee.component'
import {AdminComponent} from './admin/admin.component'
import {AdminGuard} from './guard/admin.guard'
import {AuthGuard} from './guard/auth.guard'

const routes: Route[] = [
  {component: HomeComponent, path: '', pathMatch: 'full'},
  {component: AddUpdateEmployeeComponent, path: 'add', canActivate: [AuthGuard]},
  {component: AddUpdateEmployeeComponent, path: 'add/:id', canActivate: [AuthGuard]},
  {component: ListEmployeeComponent, path: 'list', canActivate: [AuthGuard]},
  {component: RegisterComponent, path: 'register'},
  {component: AdminComponent, path: 'admin', canActivate: [AuthGuard, AdminGuard]},
  {component: LoginComponent, path: 'login'},
]
export default routes
