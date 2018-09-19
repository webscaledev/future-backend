import { DatabaseService, User } from "../../../services/database/database";
import { Component, Input, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { AuthService } from "../../../services/auth/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, flatMap, tap } from "rxjs/operators";

@Component({
  selector: "page-profile-experience-edit",
  templateUrl: "new-profile-experience.html"
})
export class ProfileExperienceEditPage implements OnInit {
  @Input()
  exp: Partial<any> = {};
  uid;
  userExp;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public afs: AngularFirestore,
    private db: DatabaseService
  ) {}

  async ngOnInit() {
    console.log("ngOnInit ProfileExperienceEditPage");
    const userId = await this.auth.getCurrentUser();
    await this.db
      .getUser(userId.uid)
      .pipe(
        flatMap((res: any) => res),
        map((res: any) => res.experience)
      )
      .subscribe(res => {
        this.userExp = res || [];
      });
    this.exp.jobTitle = this.navParams.get("jobTitle");
    this.exp.company = this.navParams.get("company");
    this.exp.duration = this.navParams.get("duration");
  }

  updateProfileExperience(user) {
    const experience = {
      jobTitle: this.exp.jobTitle,
      company: this.exp.company,
      duration: this.exp.duration,
      photoURL: this.exp.photoURL
    };
    this.userExp.push(experience);
    this.db.updateProfileExperience(user.uid, { experience: this.userExp });

    this.navCtrl.navigateBack("experiences").then(() => {
      console.log("Welcome to Profile Experiences");
    });
  }

  updateURL(e) {
    this.exp.photoURL = e;
  }
}
