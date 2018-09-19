import { Component, ViewChild, OnInit } from "@angular/core";
import {
  NavController,
  NavParams,
  Slides,
  ModalController
} from "@ionic/angular";

import { SignupPage } from "../signup/signup";
import { AuthService } from "../../services/auth/auth";
import { LoadingController } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { SLIDE_IN_UP_WITH_DELAY_ANIMATION } from "../animations/slide-in-up-with-delay.animation";
import { SLIDE_IN_LEFT_ANIMATION } from "../animations/slide-in-left.animation";
import { SLIDE_IN_DOWN_WITH_DELAY_ANIMATION } from "../animations/slide-in-down.animation";

@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html",
  animations: [
    SLIDE_IN_LEFT_ANIMATION,
    SLIDE_IN_UP_WITH_DELAY_ANIMATION,
    SLIDE_IN_DOWN_WITH_DELAY_ANIMATION
  ]
})
export class WelcomePage implements OnInit {
  changeBg = false;
  @ViewChild("slides")
  slides: Slides;

  constructor(
    public navCtrl: NavController,
    private auth: AuthService,
    private platform: Platform,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    console.log("ngOnInit WelcomePage");
  }

  async goToLogin() {
    const loading = await this.loadingController.create({
      message: "Inloggen, even wachten..."
    });
    await loading.present();
    if (this.platform.is("desktop")) {
      await this.auth
        .login()
        .then(() => {
          loading.dismiss();
        })
        .catch(err => {
          loading.dismiss();
        });
    } else {
      await this.auth
        .azureLogin()
        .then(() => {
          loading.dismiss();
        })
        .catch(err => {
          loading.dismiss();
        });
    }

    await this.navCtrl.navigateRoot("tabs");
  }

  async goToSignup() {
    const modal = await this.modalCtrl.create({
      component: SignupPage
    });
    await modal.present();
    // this.auth.azureLogin();
  }

  async slideChanged() {
    this.changeBg = (await this.slides.getActiveIndex()) > 0;
  }
}
