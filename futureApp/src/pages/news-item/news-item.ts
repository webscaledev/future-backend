import { DatabaseProvider, User } from "./../../providers/database/database";
import { Component, Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { map, flatMap } from "rxjs/operators";
import { ProfilePage } from "../profile/profile";
import { SharepointProvider } from "../../providers/sharepoint/sharepoint";

@IonicPage()
@Component({
  selector: "news-item",
  templateUrl: "news-item.html"
})
export class NewsItemPage {
  @Input() newsItem;  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad NewsItemPage");
  }
}
