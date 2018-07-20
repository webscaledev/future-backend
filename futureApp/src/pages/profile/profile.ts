import { flatMap, map } from "rxjs/operators";
import { DatabaseProvider } from "./../../providers/database/database";
import { ProfileEditPage } from "./../profile-edit/profile-edit";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { SettingsPage } from "../settings/settings";
import { ProfileSkillsPage } from "../profile-skills/profile-skills";
import { ProfileExperiencesPage } from "../profile-experiences/profile-experiences";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  profileskills: any;
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
    this.profileskills = await this.db.getUser(userId.uid).pipe(
      flatMap(res => res),
      map(res => res.skills)
    );
    this.profileexperience = await this.db.getUser(userId.uid).pipe(
      flatMap(res => res),
      map(res => res.experience)
    );
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage).then(() => {
      console.log("Welcome to Settings");
    });
  }

  goToProfileEdit(user) {
    this.navCtrl.push(ProfileEditPage, { uid: user.uid }).then(() => {
      console.log("Welcome to Profile Edit");
    });
  }

  goToProfileSkills(user) {
    this.navCtrl.push(ProfileSkillsPage, { uid: user.uid }).then(() => {
      console.log("Welcome to Profile Skills");
    });
  }

  goToProfileExperiences(user) {
    this.navCtrl.push(ProfileExperiencesPage, { uid: user.uid }).then(() => {
      console.log("Welcome to Profile Experiences");
    });
  }
}
