import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import  firebase from 'firebase';
/**
 * Generated class for the UploadImgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-img',
  templateUrl: 'upload-img.html',
})
export class UploadImgPage {

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController,
     public navParams: NavParams
    ) {
    this.myPhotosRef = firebase.storage().ref('/');
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadImgPage');
  }

}
