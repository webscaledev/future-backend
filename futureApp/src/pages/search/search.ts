import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { PostPage } from '../post/post';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  showResult: boolean = false;
  activeSegment: string = '0';
  @ViewChild('content') content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  toggleResult(value = true) {
    this.showResult = value;
    this.content.resize();
  }

  goToPost(postId) {
    this.navCtrl.push(PostPage, {
      postId: postId
    })
      .then(() => {
        console.log('Welcome to post:', postId);
      });
  }

}
