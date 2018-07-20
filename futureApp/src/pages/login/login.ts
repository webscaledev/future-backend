import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goToHome() {
    this.dismiss();
    this.app.getRootNav().setRoot(TabsPage)
      .then(() => {
        console.log('Welcome to your News Feed!');
      })
  }

  goToSignup() {
    this.viewCtrl.dismiss();
    let modal = this.modalCtrl.create(SignupPage, {}, {cssClass: 'modal-gradient'});
    modal.present();
  }

}
