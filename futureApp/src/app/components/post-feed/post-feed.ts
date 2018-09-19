import { Component, OnInit, Input } from "@angular/core";
import { DatabaseService } from "../../services/database/database";
import { AuthService } from "../../services/auth/auth";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PostPopoverComponent } from "../../components/post-popover/post-popover";
import {
  NavController,
  NavParams,
  PopoverController,
  ModalController
} from "@ionic/angular";
import { PostPage } from "../../pages/post/post";

@Component({
  selector: "post-feed",
  templateUrl: "post-feed.html"
})
export class PostFeedComponent implements OnInit {
  @Input()
  userId: string;

  posts: Observable<any[]>;

  constructor(
    private db: DatabaseService,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.posts = this.db
      .getRecentPosts()
      .snapshotChanges()
      .pipe(
        map((arr: any) =>
          arr.map(doc => {
            return { id: doc.payload.doc.id, ...doc.payload.doc.data() };
          })
        )
      );
  }

  async presentPopover(event) {
    event.stopPropagation();

    const popover = await this.popoverCtrl.create({
      component: PostPopoverComponent
    });
    await popover.present();
  }

  goToPost(postId) {
    this.navCtrl.navigateForward(`post/${postId}`).then(() => {
      console.log("Welcome to post:", postId);
    });
  }

  trackByFn(index, post) {
    return post.id;
  }
}
