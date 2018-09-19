import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { NotificationsPage } from "./notifications";
import { ComponentsModule } from "../../components/components.module";
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: "",
    component: NotificationsPage,
    outlet: "notifications"
  }
];

@NgModule({
  declarations: [NotificationsPage],
  imports: [IonicModule, RouterModule.forChild(routes), ComponentsModule]
})
export class NotificationsPageModule {}
