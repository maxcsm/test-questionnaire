import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {

  constructor(public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }



  async goToSurveys() {
    this.router.navigateByUrl('/surveys');
  }


  async goToHome() {
    this.router.navigateByUrl('/home');
  }


}
