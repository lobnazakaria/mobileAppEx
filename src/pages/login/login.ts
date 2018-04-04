import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { AfterLoginPage } from '../after-login/after-login';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  constructor(private fireAuth: AngularFireAuth,
               public navCtrl: NavController,
               public navParams: NavParams,
               public alertCtrl : AlertController
            ) {}

 

  
  signIn(user : User){
    this.fireAuth.auth.signInWithEmailAndPassword(user.email , user.password)
      .then(data => {
        debugger;
        let alert = this.alertCtrl.create({
          title: 'info',
          subTitle: 'Login Success',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(AfterLoginPage);
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      })
    
  }
  

}
