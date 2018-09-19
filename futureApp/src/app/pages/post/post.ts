import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, PopoverController } from "@ionic/angular";
import { SharepointService } from "../../services/sharepoint/sharepoint";
import { PostPopoverComponent } from "../../components/post-popover/post-popover";

@Component({
  selector: "page-post",
  templateUrl: "post.html"
})
export class PostPage implements OnInit {
  post;
  postId: number;

  constructor(
    public navCtrl: NavController,
    private sharepoint: SharepointService,
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    console.log("ngOnInit PostPage");

    this.postId = this.navParams.get("id");
    this.sharepoint.getNewsItem(this.postId).subscribe(res => {
      this.post = res;
    });
  }

  async presentPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: PostPopoverComponent
    });
    await popover.present();
  }
}
