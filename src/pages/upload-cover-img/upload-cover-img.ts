import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import  firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';
import { Profile } from '../../models/profile';
import { AfterLoginPage } from '../after-login/after-login';
/**
 * Generated class for the UploadImgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-cover-img',
  templateUrl: 'upload-cover-img.html',
})
export class UploadCoverImgPage implements OnInit{

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  clicked:boolean=false;
  imageForm:FormGroup;
  image= {} as string;
  profileData :  Observable<any>;
  profile={} as Profile;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController,
     public navParams: NavParams,
     private fireAuth:AngularFireAuth,
     private fireDatabase:AngularFireDatabase
    ) {
    this.myPhotosRef = firebase.storage().ref('/images/');
  }

  ngOnInit(){
    this.imageForm=new FormGroup({
     photo : new FormControl('')
    });
  }

  ionViewDidLoad() {
    console.log(this.profileData);
    this.fireAuth.authState.take(1).subscribe(data =>{
      if(data && data.email && data.uid){
        debugger
        this.toastCtrl.create({
          message:`welcome to APP, ${data.email}`,
          duration:3000
        }).present();
        this.profileData=this.fireDatabase.object('profile/'+data.uid).valueChanges();
        
        console.log(this.profileData)
      }
      else {
        this.toastCtrl.create({
          message:`couldnt find authentication detailes`,
          duration:3000
        }).present();
      }
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
      this.clicked=true;
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
      this.clicked=true;
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

  upload(){
    this.imageForm.controls['photo'].setValue(this.image);
    this.profile.coverPhoto=this.imageForm.value;
   
    this.fireAuth.authState.take(1).subscribe(auth => {
      this.fireDatabase.object(`profile/${auth.uid}`).update(this.profile.coverPhoto)
        .then(() => this.navCtrl.setRoot(AfterLoginPage));
    })
  }
  
}
