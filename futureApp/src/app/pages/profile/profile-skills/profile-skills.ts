import { map } from "rxjs/operators";
import { flatMap } from "rxjs/operators";
import { DatabaseService } from "../../../services/database/database";
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { AuthService } from "../../../services/auth/auth";

@Component({
  selector: "page-profile-skills",
  templateUrl: "profile-skills.html"
})
export class ProfileSkillsPage implements OnInit {
  profileskills: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  async ngOnInit() {
    console.log("ngOnInit ProfileSkillsPage");
    const userId = await this.auth.getCurrentUser();
    this.profileskills = await this.db.getUser(userId.uid).pipe(
      flatMap((res: any) => res),
      map((res: any) => res.skills)
    );
  }

  goToProfileSkillEdit(user) {
    this.navCtrl.navigateForward(`profile-skills-edit/${user.uid}`).then(() => {
      console.log("Welcome to Profile Skill Edit");
    });
  }
}
