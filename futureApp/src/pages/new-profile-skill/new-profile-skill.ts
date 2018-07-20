import { DatabaseProvider, User } from "./../../providers/database/database";
import { Component, Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { map, flatMap } from "rxjs/operators";
import { ProfileSkillsPage } from "../profile-skills/profile-skills";

@IonicPage()
@Component({
  selector: "page-profile-skill-edit",
  templateUrl: "new-profile-skill.html"
})
export class ProfileSkillEditPage {
  @Input() skill: Partial<any> = {};
  uid;
  userSkill;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public afs: AngularFirestore,
    private db: DatabaseProvider
  ) {}

  async ionViewDidLoad() {
    console.log("ionViewDidLoad ProfileSkillEditPage");
    let userId = await this.auth.getCurrentUser();
    await this.db
      .getUser(userId.uid)
      .pipe(
        flatMap(res => res),
        map(res => res.skills)
      )
      .subscribe(res => {
        this.userSkill = res || [];
        // console.log("USERPROFILE", JSON.stringify(res));
      });
    this.skill.name = this.navParams.get("name");
  }

  updateProfileSkill(user) {
    const skills = {
      name: this.skill.name
    };
    this.userSkill.push(skills);
    this.db.updateProfileSkills(user.uid, { skills: this.userSkill });
    this.navCtrl.push(ProfileSkillsPage).then(() => {
      console.log("Welcome to Profile");
    });
  }
}
