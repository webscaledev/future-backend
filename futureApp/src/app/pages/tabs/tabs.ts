
import { Component } from "@angular/core";

import { HomePage } from "../home/home";
import { NewsPage } from "./../news/news";

import { UsersPage } from "../users/users";
import { MessagingPage } from "../messaging/messaging";
import { NotificationsPage } from "../notifications/notifications";
import { JobsPage } from "../jobs/jobs";
import { AuthService } from "../../services/auth/auth";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {

  // tab1Root = HomePage;
  tab1Root = NewsPage;
  tab2Root = UsersPage;
  // tab3Root = MessagingPage;
  // tab4Root = NotificationsPage;
  tab3Root = JobsPage;

  constructor(public auth: AuthService) {

  }

  ionViewCanEnter() {
    return this.auth.isLoggedIn();
  }
}
