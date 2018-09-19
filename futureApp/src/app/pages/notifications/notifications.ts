import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";

@Component({
  selector: "page-notifications",
  templateUrl: "notifications.html"
})
export class NotificationsPage implements OnInit {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    console.log("ngOnInit NotificationsPage");
  }

  goToPost(postId) {
    this.navCtrl.navigateForward(`post/${postId}`).then(() => {
      console.log("Welcome to post:", postId);
    });
  }

  goToProfile() {
    this.navCtrl.navigateBack("profile").then(() => {
      console.log("Welcome to profile");
    });
  }

  goToSearch() {
    this.navCtrl.navigateBack("search").then(() => {
      console.log("Welcome to search");
    });
  }
}
