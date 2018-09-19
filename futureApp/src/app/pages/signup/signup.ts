import { Component, OnInit } from "@angular/core";
import { App, NavController, NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage implements OnInit {
  constructor(
    public app: App,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log("ngOnInit SignupPage");
  }

  goToHome() {
    this.navCtrl.navigateRoot("tabs").then(() => {
      console.log("Welcome to your News Feed!");
    });
  }

  goToLogin() {
    this.navCtrl.navigateRoot("welcome").then(() => {
      console.log("Welcome to login");
    });
  }
}
