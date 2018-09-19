import { flatMap } from "rxjs/operators";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController
} from "@ionic/angular";

import { ConnectionsPage } from "../connections/connections";
import { ProfilePage } from "../profile/profile";
import { SearchPage } from "../search/search";
import { DatabaseProvider } from "../../providers/database/database";
import { AuthProvider } from "../../providers/auth/auth";
import { UsersProfilePage } from "../users-profile/users-profile";

@Component({
  selector: "page-users",
  templateUrl: "users.html"
})
export class UsersPage {
  users: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public auth: AuthProvider,
    public db: DatabaseProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UsersPage");
    this.users = this.db.getUsers();
  }

  openConnections() {
    let modal = this.modalCtrl.create(ConnectionsPage);
    modal.present();
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage, {}).then(() => {
      console.log("Welcome to profile");
    });
  }

  goToUsersProfile(uid) {
    this.navCtrl.push(UsersProfilePage, { uid: uid }).then(() => {
      console.log("Welcome to Users Profile");
    });
  }

  goToSearch() {
    this.navCtrl.push(SearchPage, {}).then(() => {
      console.log("Welcome to search");
    });
  }

  trackByFn(index, user) {
    return user.uid; // or item.id
  }
}
