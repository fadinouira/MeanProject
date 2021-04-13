import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth : UserService,private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.auth.getAuthStatus();
    if(!isAuth){
      this.router.navigate(['/login']);
    }
    return true ;
  }
}
