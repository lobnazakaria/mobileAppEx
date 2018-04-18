import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { UploadImgPage } from '../upload-img/upload-img';
import { UploadCoverImgPage } from '../upload-cover-img/upload-cover-img';

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  cover:Profile;
  
  profileData :  Observable<any>;
   profileUrl:Observable<any>;
   constructor(
     public navCtrl: NavController,
      public navParams: NavParams,
      private fireAuth: AngularFireAuth,
      public toastCtrl: ToastController,
      private fireDatabase: AngularFireDatabase
     ) {
   }
 
   getStyle(){
     if (true){
       const style = `display: none`;
     return style;
     }
   }
   ionViewDidLoad() {
     console.log(this.profileData);
     this.fireAuth.authState.take(1).subscribe(data =>{
       if(data && data.email && data.uid){
         debugger
         this.toastCtrl.create({
           message:`welcome to Future, ${data.email}`,
           duration:3000
         }).present();
         this.profileData=this.fireDatabase.object('profile/'+data.uid).valueChanges();
         
         console.log(this.profileData,this.profileUrl)
       }
       else {
         this.toastCtrl.create({
           message:`couldnt find authentication detailes`,
           duration:3000
         }).present();
       }
     })
   }
 
   uploadImg(){
     this.navCtrl.push(UploadImgPage);
   }
   uploadCover(){
     this.navCtrl.push(UploadCoverImgPage);
   }
 

}
