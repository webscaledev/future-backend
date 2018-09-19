import { DatabaseService, User } from "../../../services/database/database";
import { Component, Input, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { AuthService } from "../../../services/auth/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, flatMap } from "rxjs/operators";

@Component({
  selector: "page-profile-skill-edit",
  templateUrl: "new-profile-skill.html"
})
export class ProfileSkillEditPage implements OnInit {
  @Input()
  skill: Partial<any> = {};
  uid;
  userSkill;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public afs: AngularFirestore,
    private db: DatabaseService
  ) {}

  async ngOnInit() {
    console.log("ngOnInit ProfileSkillEditPage");
    const userId = await this.auth.getCurrentUser();
    await this.db
      .getUser(userId.uid)
      .pipe(
        flatMap((res: any) => res),
        map((res: any) => res.skills)
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
    this.navCtrl.navigateBack("skills").then(() => {
      console.log("Welcome to Profile Skills");
    });
  }
}
