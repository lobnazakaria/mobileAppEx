import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import {Profile} from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AfterLoginPage } from '../after-login/after-login';
import  firebase from 'firebase';
import { Camera } from 'ionic-native';
import { FormGroup ,Validators,  FormControl} from '@angular/forms';

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
export class CreateProfilePage implements OnInit {
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  profile = {} as Profile;
  profileForm:FormGroup;
  image= {} as string;
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private fireAuth : AngularFireAuth,
               private fireDatabase : AngularFireDatabase,
               public toastCtrl: ToastController,
              public loadingCtrl:LoadingController,
             public alertCtrl:AlertController
              
              ) {
                this.myPhotosRef = firebase.storage().ref('/images/');
               
  }

  ngOnInit(){
    this.profileForm=new FormGroup({
      username: new FormControl('',Validators.required),
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      age:new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),
      photo:new FormControl('')

    })
  }
 

  takePhoto() {
    Camera.getPicture({
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 30000
      });
      loader.present();
    }, error => {
      this.toastCtrl.create({
        message:JSON.stringify(error),
        duration:3000
      }).present();
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhoto(): void {
    
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.JPEG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 30000
      });
      loader.present();
    }, error => {
      this.toastCtrl.create({
        message:JSON.stringify(error).toString(),
        duration:3000
      }).present();
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.jpeg')
      .putString(this.myPhoto, 'base64', { contentType: 'image/jpeg' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
        this.image=this.myPhotoURL;
        
        let loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 3000
        });
        this.fireAuth.authState.take(1).subscribe(auth => {
          })
        loader.present();
        this.toastCtrl.create({
          message:"image uploaded successfully",
          duration:3000
        }).present();
      })
     .catch(error => {
      this.toastCtrl.create({
        message:error.message,
        duration:3000
      }).present();
     }) 
  }

  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  createProfile(){
   
    
    this.alertCtrl.create({
      title: 'New Friend!',
      subTitle:this.image,
      buttons: ['OK']
    }).present();
    this.profileForm.controls['photo'].setValue(this.image);
    this.profile=this.profileForm.value;
   
    this.fireAuth.authState.take(1).subscribe(auth => {
      this.fireDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => this.navCtrl.setRoot(AfterLoginPage));
    })
  }

}
