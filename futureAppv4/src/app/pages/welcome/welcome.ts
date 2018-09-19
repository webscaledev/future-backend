import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  Slides,
  ModalController
} from "@ionic/angular";

import { SignupPage } from "../signup/signup";
import { TabsPage } from "../tabs/tabs";
import { AuthProvider } from "../../providers/auth/auth";
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
export class WelcomePage {
  changeBg: boolean = false;
  @ViewChild("slides") slides: Slides;

  constructor(
    public navCtrl: NavController,
    private auth: AuthProvider,
    private platform: Platform,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingController: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad WelcomePage");
  }

  async goToLogin() {
    let loading = this.loadingController.create({
      content: "Inloggen, even wachten..."
    });
    loading.present();
    if (this.platform.is("core")) {
      await this.auth
        .login()
        .then(() => {
          loading.dismissAll();
        })
        .catch(err => {
          loading.dismissAll();
        });
    } else {
      await this.auth
        .azureLogin()
        .then(() => {
          loading.dismissAll();
        })
        .catch(err => {
          loading.dismissAll();
        });
    }

    await this.navCtrl.setRoot(TabsPage);
  }

  goToSignup() {
    let modal = this.modalCtrl.create(
      SignupPage,
      {},
      { cssClass: "modal-gradient" }
    );
    modal.present();
    // this.auth.azureLogin();
  }

  slideChanged() {
    this.changeBg = this.slides.getActiveIndex() > 0;
  }
}
