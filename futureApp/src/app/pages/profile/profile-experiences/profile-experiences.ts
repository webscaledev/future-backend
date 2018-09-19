import { map } from "rxjs/operators";
import { flatMap } from "rxjs/operators";
import { DatabaseService } from "../../../services/database/database";
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { AuthService } from "../../../services/auth/auth";

@Component({
  selector: "page-profile-experiences",
  templateUrl: "profile-experiences.html"
})
export class ProfileExperiencesPage implements OnInit {
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
    this.profileexperience = await this.db.getUser(userId.uid).pipe(
      flatMap((res: any) => res),
      map((res: any) => res.experience)
    );
  }

  goToProfileExperienceEdit(user) {
    this.navCtrl.navigateForward(`profile-exp-edit/${user.uid}`).then(() => {
      console.log("Welcome to Profile Edit");
    });
  }
}
