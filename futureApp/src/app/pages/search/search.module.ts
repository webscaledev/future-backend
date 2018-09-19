import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SearchPage } from "./search";
import { ComponentsModule } from "../../components/components.module";

const routes = [
  {
    path: "",
    component: SearchPage,
    outlet: "search"
  }
];

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class SearchPageModule {}
