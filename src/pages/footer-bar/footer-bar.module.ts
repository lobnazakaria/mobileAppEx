import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FooterBarPage } from './footer-bar';

@NgModule({
  declarations: [
    FooterBarPage,
  ],
  imports: [
    IonicPageModule.forChild(FooterBarPage),
  ],
})
export class FooterBarPageModule {}
