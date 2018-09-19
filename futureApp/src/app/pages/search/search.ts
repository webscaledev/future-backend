import { Component, ViewChild, OnInit } from "@angular/core";
import { NavController, NavParams, Content } from "@ionic/angular";

@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage implements OnInit {
  showResult = false;
  activeSegment = "0";
  @ViewChild("content")
  content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    console.log("ngOnInit SearchPage");
  }

  toggleResult(value = true) {
    this.showResult = value;
  }

  goToPost(postId) {
    this.navCtrl.navigateForward(`post/${postId}`).then(() => {
      console.log("Welcome to post:", postId);
    });
  }
}
