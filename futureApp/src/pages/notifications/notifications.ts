import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PostPage } from '../post/post';
import { ProfilePage } from '../profile/profile';
import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  goToPost(postId) {
    this.navCtrl.push(PostPage, {
      postId: postId
    })
      .then(() => {
        console.log('Welcome to post:', postId);
      });
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage, {})
      .then(() => {
        console.log('Welcome to profile');
      })
  }

  goToSearch() {
    this.navCtrl.push(SearchPage, {})
      .then(() => {
        console.log('Welcome to search');
      })
  }

}
