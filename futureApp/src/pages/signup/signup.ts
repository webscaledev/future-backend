import { WelcomePage } from "./../welcome/welcome";
import { Component } from "@angular/core";
import {
  App,
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController
} from "ionic-angular";
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goToHome() {
    this.dismiss();
    this.app
      .getRootNav()
      .setRoot(TabsPage)
      .then(() => {
        console.log("Welcome to your News Feed!");
      });
  }

  goToLogin() {
    this.dismiss();
    this.app
      .getRootNav()
      .setRoot(WelcomePage)
      .then(() => {
        console.log("Welcome to login");
      });
  }
}
