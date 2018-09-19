import { flatMap, map } from "rxjs/operators";
import { DatabaseService } from "../../../services/database/database";
import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";

@Component({
  selector: "page-users-profile",
  templateUrl: "users-profile.html"
})
export class UsersProfilePage implements OnInit {
  profileskills: any;
  profileexperience: any;
  user;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseService
  ) {}

  async ngOnInit() {
    console.log("ngOnInit UsersProfilePage");

    const userId = this.navParams.get("uid");
    this.user = await this.db.getUser(userId).pipe(
      flatMap((res: any) => res),
      map(res => res)
    );
    this.profileskills = await this.db.getUser(userId).pipe(
      flatMap((res: any) => res),
      map((res: any) => res.skills)
    );
    this.profileexperience = await this.db.getUser(userId).pipe(
      flatMap((res: any) => res),
      map((res: any) => res.experience)
    );
  }
}
