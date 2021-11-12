import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
  export class AuthGuard implements CanActivate {

  constructor(private router : Router,
    private authService : AuthenticationService){
}

canActivate(
next: ActivatedRouteSnapshot,
state: RouterStateSnapshot): boolean {
const url: string = state.url;
return this.checkLogin(url);
}
canActivateChild(route : ActivatedRouteSnapshot , state : RouterStateSnapshot) : boolean {
return this.canActivate(route ,state);
}

checkLogin(url: string): boolean {
console.log(this.authService.loggedInStatus);

if (this.authService.loggedInStatus) { return true; }

// Store the attempted URL for redirecting
this.authService.redirectUrl = url;

// Navigate to the login page with extras
this.router.navigate(['/login']);

return false;

} 
}
