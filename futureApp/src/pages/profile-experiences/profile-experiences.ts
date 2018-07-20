import { map } from "rxjs/operators";
import { flatMap } from "rxjs/operators";
import { DatabaseProvider } from "./../../providers/database/database";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { SettingsPage } from "../settings/settings";
import { ProfileExperienceEditPage } from "../new-profile-experience/new-profile-experience";

@IonicPage()
@Component({
  selector: "page-profile-experiences",
  templateUrl: "profile-experiences.html"
})
export class ProfileExperiencesPage {
  profileexperience: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public db: DatabaseProvider
  ) {}

  async ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
    let userId = await this.auth.getCurrentUser();
    this.profileexperience = await this.db.getUser(userId.uid).pipe(
      flatMap(res => res),
      map(res => res.experience)
    );
  }

  goToProfileExperienceEdit(user) {
    this.navCtrl.push(ProfileExperienceEditPage, { uid: user.uid }).then(() => {
      console.log("Welcome to Profile Edit");
    });
  }
}
