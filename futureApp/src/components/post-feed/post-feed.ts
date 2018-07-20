import { Component, OnInit, Input } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PostPopoverComponent } from '../../components/post-popover/post-popover';
import { IonicPage, NavController, NavParams, PopoverController, ModalController} from 'ionic-angular';
import { PostPage } from '../../pages/post/post';

@Component({
  selector: 'post-feed',
  templateUrl: 'post-feed.html'
})
export class PostFeedComponent implements OnInit {

  @Input() userId: string;  

  posts: Observable<any[]>;

  constructor(private db: DatabaseProvider, public popoverCtrl: PopoverController,public navCtrl: NavController,public auth: AuthProvider) { }

  ngOnInit() {

    this.posts = this.db.getRecentPosts().snapshotChanges().pipe(
      map(arr => arr.map(doc => {
        return { id: doc.payload.doc.id, ...doc.payload.doc.data() }
      }))
    )
  }

  presentPopover(event) {
    event.stopPropagation();

    let popover = this.popoverCtrl.create(PostPopoverComponent, {}, {
      cssClass: 'my-popover'
    });
    popover.present({
      ev: event
    });
  }

  goToPost(postId) {
    this.navCtrl.push(PostPage, {
      postId: postId
    })
      .then(() => {
        console.log('Welcome to post:', postId);
      });
  }

  trackByFn(index, post) {
    return post.id;
  }

}