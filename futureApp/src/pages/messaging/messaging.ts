import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MessagePage } from '../message/message';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
})
export class MessagingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagingPage');
  }

  goToMessage() {
    this.navCtrl.push(MessagePage, {})
      .then(() => {
        console.log('Welcome to Message');
      })
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage, {})
      .then(() => {
        console.log('Welcome to profile');
      })
  }

}
