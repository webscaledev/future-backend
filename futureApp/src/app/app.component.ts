import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { WelcomePage } from '../pages/welcome/welcome';
import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;
  showSplash = true;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, private fcm: FCM, splashScreen: SplashScreen, keyboard: Keyboard, auth: AuthProvider) {
    platform.ready().then(() => {
      auth.getCurrentUser()
        .then(user => { 

          if (user) {
            this.rootPage = TabsPage 
          } else {
            this.rootPage = WelcomePage
          }

          statusBar.styleDefault();
          splashScreen.hide();
          this.fcm.onNotification()
          keyboard.disableScroll(true);
          keyboard.hideKeyboardAccessoryBar(true);
          timer(1500).subscribe(() => this.showSplash = false) // <-- hide animation after 1.5s
      })

    });
  }
}
