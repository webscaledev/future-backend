import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { MessagingPage } from "./messaging";
import { ComponentsModule } from "../../components/components.module";
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: "",
    component: MessagingPage,
    outlet: "messaging"
  }
];

@NgModule({
  declarations: [
    MessagingPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class MessagingPageModule {}
