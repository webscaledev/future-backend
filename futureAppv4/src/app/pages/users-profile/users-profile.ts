import { flatMap, map } from "rxjs/operators";
import { DatabaseProvider } from "./../../providers/database/database";
import { Component } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";

@Component({
  selector: "page-users-profile",
  templateUrl: "users-profile.html"
})
export class UsersProfilePage {
  profileskills: any;
  profileexperience: any;
  user;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider
  ) {}

  async ionViewDidLoad() {
    console.log("ionViewDidLoad UsersProfilePage");

    let userId = this.navParams.get("uid");
    this.user = await this.db.getUser(userId).pipe(
      flatMap(res => res),
      map(res => res)
    );
    this.profileskills = await this.db.getUser(userId).pipe(
      flatMap(res => res),
      map(res => res.skills)
    );
    this.profileexperience = await this.db.getUser(userId).pipe(
      flatMap(res => res),
      map(res => res.experience)
    );
  }
}
