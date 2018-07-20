import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SharepointProvider } from '../../providers/sharepoint/sharepoint';
import { PostPopoverComponent } from '../../components/post-popover/post-popover';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  post;
  postId: number;

  constructor(public navCtrl: NavController,private sharepoint: SharepointProvider, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');

    this.postId = this.navParams.get('id');
    this.sharepoint.getNewsItem(this.postId).subscribe(res =>{
      this.post = res;
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PostPopoverComponent, {}, {
      cssClass: 'my-popover'
    });
    popover.present({
      ev: event
    });
  }

}
