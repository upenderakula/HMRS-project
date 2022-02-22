import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let employeeId = localStorage.getItem('employeeId');
        if (employeeId) {
            return true;
        }
        else {
            return this.router.navigate(['/un-authorized']);
        }
    }
}