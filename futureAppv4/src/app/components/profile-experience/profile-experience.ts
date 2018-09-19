import { DatabaseProvider } from "./../../providers/database/database";
import { flatMap, map } from "rxjs/operators";
import { Component, Input, ElementRef } from "@angular/core";
import { AuthProvider } from "../../providers/auth/auth";
import { NavController, NavParams } from "@ionic/angular";
import { ProfileExperienceEditPage } from "../../pages/new-profile-experience/new-profile-experience";

@Component({
  selector: "profile-experience",
  templateUrl: "profile-experience.html"
})
export class ProfileExperienceComponent {
  @Input() profileexperience: any[];
  @Input() showEdit: boolean;
  userExp;
  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public db: DatabaseProvider
  ) {}

  goToProfileExperienceEdit(exp) {
    this.navCtrl
      .push(ProfileExperienceEditPage, {
        jobTitle: exp.jobTitle,
        company: exp.company,
        duration: exp.duration
      })
      .then(() => {
        console.log("Welcome to Profile Experience Edit");
      });
  }

  async deleteExperience(exp) {
    let index = this.profileexperience.indexOf(exp);

    if (index > -1) {
      this.profileexperience.splice(index, 1);
    }

    let user = await this.auth.getCurrentUser();
    await this.db.updateProfileExperience(user.uid, {
      experience: this.profileexperience
    });
  }
}
