import { map } from "rxjs/operators";
import { flatMap } from "rxjs/operators";
import { ProfileSkillEditPage } from "./../new-profile-skill/new-profile-skill";
import { DatabaseProvider } from "./../../providers/database/database";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: "page-profile-skills",
  templateUrl: "profile-skills.html"
})
export class ProfileSkillsPage {
  profileskills: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public db: DatabaseProvider
  ) {}

  async ionViewDidLoad() {
    console.log("ionViewDidLoad ProfileSkillsPage");
    let userId = await this.auth.getCurrentUser();
    this.profileskills = await this.db.getUser(userId.uid).pipe(
      flatMap(res => res),
      map(res => res.skills)
    );
  }

  goToProfileSkillEdit(user) {
    this.navCtrl.push(ProfileSkillEditPage, { uid: user.uid }).then(() => {
      console.log("Welcome to Profile Skill Edit");
    });
  }
}
