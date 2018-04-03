import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  user = {} as User
  constructor(private fireAuth: AngularFireAuth ,
               public navCtrl: NavController,
               public navParams: NavParams,
               public alertCtrl : AlertController
              ) {
  }

  signUp(user : User){
    
      this.fireAuth.auth.createUserWithEmailAndPassword(user.email , user.password)
      .then(data =>{
        let alert = this.alertCtrl.create({
          title: 'Registered !',
          subTitle: ' will be directed to the login page',
          buttons: ['OK']
        });
        alert.present();
      this.navCtrl.push(LoginPage);
      })
      .catch (error =>{
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
        console.log(error.message.toString());
   });

  }
}
