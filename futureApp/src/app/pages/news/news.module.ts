import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { NewsPage } from "./news";
import { ComponentsModule } from "../../components/components.module";
import { RouterModule } from "@angular/router";
import { NewsItemPage } from "./news-item/news-item";

const routes = [
  {
    path: "",
    component: NewsPage,
    outlet: "news",
    children: [{ path: "new-item", component: NewsItemPage }]
  }
];

@NgModule({
  declarations: [NewsPage],
  imports: [IonicModule, RouterModule.forChild(routes), ComponentsModule]
})
export class NewsPageModule {}
