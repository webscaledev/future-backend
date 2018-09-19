import { UsersProfilePage } from "./users-profile/users-profile";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { UsersPage } from "./users";
import { ComponentsModule } from "../../components/components.module";

const routes = [
  {
    path: "",
    component: UsersPage,
    outlet: "users",
    children: [{ path: "profile-detail/:id", component: UsersProfilePage }]
  }
];

@NgModule({
  declarations: [UsersPage],
  imports: [IonicModule, RouterModule.forChild(routes), ComponentsModule]
})
export class UsersPageModule {}
