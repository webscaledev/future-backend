import { Component, OnInit } from "@angular/core";
import { App, NavController, NavParams, ModalController } from "@ionic/angular";

import { TabsPage } from "../tabs/tabs";
import { SignupPage } from "../signup/signup";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage implements OnInit {
  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    console.log("ngOnInit LoginPage");
  }

  goToHome() {
    this.navCtrl.navigateRoot("tabs").then(() => {
      console.log("Welcome to your News Feed!");
    });
  }

  async goToSignup() {
    const modal = await this.modalCtrl.create({
      component: SignupPage
    });
    await modal.present();
  }
}
