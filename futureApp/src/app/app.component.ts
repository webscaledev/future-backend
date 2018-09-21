import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AngularFireMessaging } from "@angular/fire/messaging";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afMessaging: AngularFireMessaging
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      token => {
        console.log("Permission granted! Save to the server!", token);
      },
      error => {
        console.error(error);
      }
    );
  }
}
