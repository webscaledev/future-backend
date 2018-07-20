import { DatabaseProvider, User } from "./../../providers/database/database";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { map, flatMap } from "rxjs/operators";
import { ProfilePage } from "../profile/profile";

@IonicPage()
@Component({
  selector: "page-profile-edit",
  templateUrl: "profile-edit.html"
})
export class ProfileEditPage {
  profile: Partial<User> = {};
  uid;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public afs: AngularFirestore,
    private db: DatabaseProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfileEditPage");
    this.uid = this.navParams.get("uid");
    this.db
      .getUser(this.uid)
      .pipe(flatMap(res => res))
      .subscribe(res => {
        this.profile = res;
        // console.log("USERPROFILE", JSON.stringify(res));
      });
  }

  async updateProfile(user) {
    await this.db.updateProfile(user.uid, this.profile as User);
    this.navCtrl.push(ProfilePage).then(() => {
      console.log("Welcome to Profile");
    });
  }

  updateURL(e) {
    this.profile.photoURL = e;
  }
}
