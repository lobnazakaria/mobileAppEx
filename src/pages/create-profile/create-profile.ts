import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Profile} from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AfterLoginPage } from '../after-login/after-login';
/**
 * Generated class for the CreateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {
  profile = {} as Profile;
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private fireAuth : AngularFireAuth,
               private fireDatabase : AngularFireDatabase
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProfilePage');
  }
  createProfile(){
    this.fireAuth.authState.take(1).subscribe(auth => {
      this.fireDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => this.navCtrl.setRoot(AfterLoginPage));
    })
  }

}
