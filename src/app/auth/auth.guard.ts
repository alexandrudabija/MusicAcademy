import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

constructor (private router :Router,private userService: UserService){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

if(!this.userService.getToken())
{
this.router.navigateByUrl('/signIn');
this.userService.delteToken();
}

    return true;
  }


  // The method "canActivate()" returns a boolean value indicating whether the route can be accessed or not. In this specific code,
  // it first checks if the token exists in the user service by calling the "getToken()" method, if token is not present it navigates to the login page
  // and deletes the token, if it is present it returns true, which means the route can be accessed.

  // The constructor of the class takes in two parameters, the "Router" and the "UserService". The "Router" is used to navigate to different
  // routes in the application and the "UserService" is used to check if the user is logged in or not.



}
