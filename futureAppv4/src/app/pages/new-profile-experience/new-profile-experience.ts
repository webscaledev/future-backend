import { ProfileExperiencesPage } from "./../profile-experiences/profile-experiences";
import { DatabaseProvider, User } from "./../../providers/database/database";
import { Component, Input } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { AuthProvider } from "../../providers/auth/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { map, flatMap, tap } from "rxjs/operators";

@Component({
  selector: "page-profile-experience-edit",
  templateUrl: "new-profile-experience.html"
})
export class ProfileExperienceEditPage {
  @Input() exp: Partial<any> = {};
  uid;
  userExp;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public afs: AngularFirestore,
    private db: DatabaseProvider
  ) {}

  async ionViewDidLoad() {
    console.log("ionViewDidLoad ProfileExperienceEditPage");
    let userId = await this.auth.getCurrentUser();
    await this.db
      .getUser(userId.uid)
      .pipe(
        flatMap(res => res),
        map(res => res.experience)
      )
      .subscribe(res => {
        this.userExp = res || [];
      });
     this.exp.jobTitle = this.navParams.get('jobTitle'); 
     this.exp.company = this.navParams.get('company'); 
     this.exp.duration = this.navParams.get('duration'); 
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

    this.navCtrl.push(ProfileExperiencesPage).then(() => {
      console.log("Welcome to Profile Experiences");
    });
  }

  updateURL(e) {
    this.exp.photoURL = e;
  }
}
