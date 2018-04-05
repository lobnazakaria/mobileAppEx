import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SignUpPage} from '../pages/sign-up/sign-up';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AfterLoginPage } from '../pages/after-login/after-login';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { UploadImgPage } from '../pages/upload-img/upload-img';
import { Camera } from 'ionic-native';

const firebaseAuth={
  apiKey: "AIzaSyCqhGKujLWQ6XqzdVYSpoNTaBzjE1eKidE",
    authDomain: "mobileappex.firebaseapp.com",
    databaseURL: "https://mobileappex.firebaseio.com",
    projectId: "mobileappex",
    storageBucket: "mobileappex.appspot.com",
    messagingSenderId: "878589870793"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    AfterLoginPage,
    CreateProfilePage,
    UploadImgPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    AfterLoginPage,
    CreateProfilePage,
    UploadImgPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
