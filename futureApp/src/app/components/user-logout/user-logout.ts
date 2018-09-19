import { WelcomePage } from "./../../pages/welcome/welcome";
import { Component } from "@angular/core";
import { AuthService } from "../../services/auth/auth";
import { NavController, App } from "@ionic/angular";

@Component({
  selector: "user-logout",
  templateUrl: "user-logout.html"
})
export class UserLogoutComponent {
  constructor(
    public auth: AuthService,
    public navCtrl: NavController,
    private app: App
  ) {}

  async logout() {
    await this.auth.logout();
    this.navCtrl.navigateRoot("welcome");
  }
}
