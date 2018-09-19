import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ModalController } from "@ionic/angular";
import { ConnectionsPage } from "../connections/connections";
import { DatabaseService } from "../../services/database/database";
import { AuthService } from "../../services/auth/auth";

@Component({
  selector: "page-users",
  templateUrl: "users.html"
})
export class UsersPage implements OnInit {
  users: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  ngOnInit() {
    console.log("ngOnInit UsersPage");
    this.users = this.db.getUsers();
  }

  async openConnections() {
    const modal = await this.modalCtrl.create({ component: ConnectionsPage });
    await modal.present();
  }

  goToProfile() {
    this.navCtrl.navigateForward("profile").then(() => {
      console.log("Welcome to profile");
    });
  }

  goToUsersProfile(uid) {
    this.navCtrl.navigateForward(`user-profile/${uid}`).then(() => {
      console.log("Welcome to Users Profile");
    });
  }

  goToSearch() {
    this.navCtrl.navigateForward("search").then(() => {
      console.log("Welcome to search");
    });
  }

  trackByFn(index, user) {
    return user.uid; // or item.id
  }
}
