import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login(userinfo) {
    this.storage.set('USER_INFO', userinfo).then((response) => {
   //   this.router.navigate(['dashboard']);
      this.authState.next(true);
    });
  }

  logout() {


    this.storage.remove('iduser').then(() => {
    
    });

   this.storage.remove('firstname').then(() => {
    
    });


   this.storage.remove('lastname').then(() => {
    
    });

   this.storage.remove('phone_number').then(() => {
    
    });

    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }



}