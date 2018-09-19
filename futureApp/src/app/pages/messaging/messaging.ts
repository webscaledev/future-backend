import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";

@Component({
  selector: "page-messaging",
  templateUrl: "messaging.html",
})
export class MessagingPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    console.log("ngOnInit MessagingPage");
  }

  goToMessage() {
    this.navCtrl.navigateForward("message")
      .then(() => {
        console.log("Welcome to Message");
      });
  }

  goToProfile() {
    this.navCtrl.navigateBack("profile")
      .then(() => {
        console.log("Welcome to profile");
      });
  }

}
