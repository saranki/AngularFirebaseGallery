import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

  title: 'Gallery';
  user: Observable<firebase.User>;
  constructor(private authService: AuthenticationService, private route: Router) { }

  ngOnInit() {
    this.user = this.authService.authUser();
  }

  logout() {
    this.authService.logout()
    .then(onResolve => this.route.navigate['/']);
  }
}
