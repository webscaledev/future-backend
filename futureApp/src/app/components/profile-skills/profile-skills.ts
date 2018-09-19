import { DatabaseService } from "./../../services/database/database";
import { Component, Input, ElementRef } from "@angular/core";
import { AuthService } from "../../services/auth/auth";
import { NavController, NavParams } from "@ionic/angular";

@Component({
  selector: "profile-skills",
  templateUrl: "profile-skills.html"
})
export class ProfileSkillsComponent {
  @Input()
  profileskills: any[];
  @Input()
  showEdit: boolean;
  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  goToProfileSkillEdit(skill) {
    this.navCtrl
      .navigateForward(`profile-skill-edit/${skill.name}`)
      .then(() => {
        console.log("Welcome to Profile Experience Edit");
      });
  }

  async deleteSkill(skill) {
    const index = this.profileskills.indexOf(skill);

    if (index > -1) {
      this.profileskills.splice(index, 1);
    }

    const user = await this.auth.getCurrentUser();
    await this.db.updateProfileSkills(user.uid, { skills: this.profileskills });
  }
}
