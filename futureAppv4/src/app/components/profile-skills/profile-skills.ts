import { DatabaseProvider } from "./../../providers/database/database";
import { Component, Input, ElementRef } from "@angular/core";
import { AuthProvider } from "../../providers/auth/auth";
import { NavController, NavParams } from "@ionic/angular";
import { ProfileSkillEditPage } from "../../pages/new-profile-skill/new-profile-skill";

@Component({
  selector: "profile-skills",
  templateUrl: "profile-skills.html"
})
export class ProfileSkillsComponent {
  @Input() profileskills: any[];
  @Input() showEdit: boolean;
  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public db: DatabaseProvider
  ) {}

  goToProfileSkillEdit(skill) {
    this.navCtrl.push(ProfileSkillEditPage, { name: skill.name }).then(() => {
      console.log("Welcome to Profile Experience Edit");
    });
  }

  async deleteSkill(skill) {
    let index = this.profileskills.indexOf(skill);

    if (index > -1) {
      this.profileskills.splice(index, 1);
    }

    let user = await this.auth.getCurrentUser();
    await this.db.updateProfileSkills(user.uid, { skills: this.profileskills });
  }
}
