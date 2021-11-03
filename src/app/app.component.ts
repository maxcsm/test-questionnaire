import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from 'src/providers/authentication.service';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }



  initializeApp() {




    this.platform.ready().then(() => {
  

    console.log(this.statusBar.isVisible);


      this.statusBar.overlaysWebView(false)
      this.statusBar.styleDefault();
      this.statusBar.styleLightContent(); 
      //Status bar color, light if you have dark header
      this.statusBar.backgroundColorByHexString('#0C098D');
      this.splashScreen.hide();
      this.router.navigateByUrl('/tabs');

    });
  }


}
