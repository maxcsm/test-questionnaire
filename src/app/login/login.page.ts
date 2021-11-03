import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/providers/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  email: any;
  password: number;

  token: any;
  password2: string | Int32Array;
  iduser: any;



  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public redditService: RedditService,
    private router: Router,
    private authService: AuthenticationService,
    public alertController: AlertController,
    private storage: Storage
  ) {


  }

  ionViewWillEnter() {


    this.menuCtrl.enable(false);
     this.storage.get('email').then((email) => {
     this.email=email;
     });
    this.storage.get('password').then((password) => {
     this.password=password;
  });
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }



  async goLogin() {
    const loader = await this.loadingCtrl.create({
      duration: 3000
    });
    loader.present();
   
    // this.password2=Md5.hashStr(this.password);
    var data = JSON.stringify({
      email: this.email,
      password: this.password,
    });

    this.redditService.login(data)
      .subscribe((response) => {
        if (response == null) {
          this.presentAlert();
        } else if (response !== null) {

          loader.onWillDismiss().then(async l => {
            const toast = await this.toastCtrl.create({
              cssClass: 'bg-profile',
              message: 'Connexion réussie ',
              duration: 1000,
              position: 'bottom',
            });

            toast.present();
          });

          var userinfo = JSON.stringify({
            email: response[0].email,
            firstname: response[0].firstname,
            lastname: response[0].lastname,
            id: response[0].id
          });

          this.authService.login(userinfo);

          this.iduser = response.id;
          this.storage.set('iduser', this.iduser);
          // this.storage.set("token",this.token);

          this.storage.set('password', this.password);
          this.storage.set('iduser', response[0].id);
          this.storage.set('firstname', response[0].firstname);
          this.storage.set('lastname', response[0].lastname);
          this.storage.set('email', response[0].email);
          this.storage.set('phone_number', response[0].phone_number);

          setTimeout(() => {
            handler: async () => {
              const loader = await this.loadingCtrl.create({
                duration: 2000
              });
              loader.present();
            }
            this.navCtrl.navigateRoot('/tabs');
          }, 2000);
        }
      },
        error => {
          console.log(error);
          this.presentAlert();
        });
  }




  public set(settingName, value) {
    return this.storage.set(`setting:${settingName}`, value);
  }

  public async get(settingName) {
    return await this.storage.get(`setting:${settingName}`);
  }


  async goToRegister() {
    this.router.navigateByUrl('/register');
  }
  async forgotPass() {
    this.router.navigateByUrl('/forgotpassword');
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erreur',
      subHeader: '',
      message: 'E-mail ou mot de passe incorrect',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');
        }
      },
      {
        text: 'Annuler',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
      ]
    });

    await alert.present();
  }

}
