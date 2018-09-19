import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { PostPage } from "./post";
import { ComponentsModule } from "../../components/components.module";
import { RouterModule } from "@angular/router";
import { NewPostPage } from "./new-post/new-post";

const routes = [
  {
    path: "",
    component: PostPage,
    outlet: "post",
    children: [{ path: "new-post", component: NewPostPage }]
  }
];

@NgModule({
  declarations: [PostPage],
  imports: [IonicModule, RouterModule.forChild(routes), ComponentsModule]
})
export class PostPageModule {}
