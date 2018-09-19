import { DatabaseService } from "./../../services/database/database";
import { flatMap, map } from "rxjs/operators";
import { Component, Input, ElementRef } from "@angular/core";
import { AuthService } from "../../services/auth/auth";
import { NavController, NavParams } from "@ionic/angular";

@Component({
  selector: "profile-experience",
  templateUrl: "profile-experience.html"
})
export class ProfileExperienceComponent {
  @Input()
  profileexperience: any[];
  @Input()
  showEdit: boolean;
  userExp;
  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  goToProfileExperienceEdit(exp) {
    this.navCtrl
      .navigateForward(
        `profile-exp-edit/${exp.jobTitle}/${exp.company}/${exp.duration}`
      )
      .then(() => {
        console.log("Welcome to Profile Experience Edit");
      });
  }

  async deleteExperience(exp) {
    const index = this.profileexperience.indexOf(exp);

    if (index > -1) {
      this.profileexperience.splice(index, 1);
    }

    const user = await this.auth.getCurrentUser();
    await this.db.updateProfileExperience(user.uid, {
      experience: this.profileexperience
    });
  }
}
