import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import {UserService} from '../service/user.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const roles = this.userService.getUserRoles()
    if (roles && roles.includes('admin')) {
      return true
    }
    this.router.navigate(['list'])
    return false
  }
}
