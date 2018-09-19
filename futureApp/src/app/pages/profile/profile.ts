import { flatMap, map } from "rxjs/operators";
import { DatabaseService } from "./../../services/database/database";
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { AuthService } from "../../services/auth/auth";

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage implements OnInit {
  profileskills: any;
  profileexperience: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  async ngOnInit() {
    console.log("ngOnInit ProfilePage");
    const userId = await this.auth.getCurrentUser();
    this.profileskills = await this.db.getUser(userId.uid).pipe(
      flatMap((res: any) => res),
      map((res: any) => res.skills)
    );
    this.profileexperience = await this.db.getUser(userId.uid).pipe(
      flatMap((res: any) => res),
      map((res: any) => res.experience)
    );
  }

  goToSettings() {
    this.navCtrl.navigateForward("settings").then(() => {
      console.log("Welcome to Settings");
    });
  }

  goToProfileEdit(user) {
    this.navCtrl.navigateForward(`profile-edit/${user.uid}`).then(() => {
      console.log("Welcome to Profile Edit");
    });
  }

  goToProfileSkills(user) {
    this.navCtrl.navigateForward(`profile-skills/${user.uid}`).then(() => {
      console.log("Welcome to Profile Skills");
    });
  }

  goToProfileExperiences(user) {
    this.navCtrl.navigateForward(`profile-experiences/${user.uid}`).then(() => {
      console.log("Welcome to Profile Experiences");
    });
  }
}
