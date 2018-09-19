import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ConnectionsPage } from "./connections";
import { ComponentsModule } from "../../components/components.module";
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: "",
    component: ConnectionsPage,
    outlet: "connections"
  }
];

@NgModule({
  declarations: [
    ConnectionsPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class ConnectionsPageModule {}
