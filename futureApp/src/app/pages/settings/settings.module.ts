import { RouterModule } from "@angular/router";
import { ComponentsModule } from "./../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SettingsPage } from "./settings";

const routes = [
  {
    path: "",
    component: SettingsPage,
    outlet: "settings"
  }
];

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class SettingsPageModule {}
