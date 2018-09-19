import { DatabaseService, User } from "../../../services/database/database";
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { AuthService } from "../../../services/auth/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, flatMap } from "rxjs/operators";

@Component({
  selector: "page-profile-edit",
  templateUrl: "profile-edit.html"
})
export class ProfileEditPage implements OnInit {
  profile: Partial<User> = {};
  uid;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public afs: AngularFirestore,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    console.log("ngOnInit ProfileEditPage");
    this.uid = this.navParams.get("uid");
    this.db
      .getUser(this.uid)
      .pipe(flatMap((res: any) => res))
      .subscribe(res => {
        this.profile = res;
        // console.log("USERPROFILE", JSON.stringify(res));
      });
  }

  async updateProfile(user) {
    await this.db.updateProfile(user.uid, this.profile as User);
    this.navCtrl.navigateForward("profile").then(() => {
      console.log("Welcome to Profile");
    });
  }

  updateURL(e) {
    this.profile.photoURL = e;
  }
}
