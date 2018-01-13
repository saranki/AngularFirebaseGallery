//To act as a service
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

//Service
@Injectable()
export class AuthenticationGuard implements CanActivate {
    user: Observable<firebase.User>;

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.user = afAuth.authState;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //If user is not authorized we force him to authorize inorder to enter the system
        return this.user.map((auth)=> {
            if(!auth){
                this.router.navigateByUrl('/login');
                return false;
            }
            return true;
        }).take(1);//because we are using map here
    }
}