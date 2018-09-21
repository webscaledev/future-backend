import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomePage } from "./pages/welcome/welcome";

const routes: Routes = [
  { path: "" , component: WelcomePage}
  // { path: "", redirectTo: "welcome", pathMatch: "full" },
  // { path: "welcome", loadChildren: "./pages/welcome/welcome.module#WelcomePageModule" },
  // { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
  // { path: "tabs", loadChildren: "./pages/tabs/tabs.module#TabsPageModule" },
  // { path: "news", loadChildren: "./pages/news/news.module#NewsPageModule" },
  // { path: "profile", loadChildren: "./pages/profile/profile.module#ProfilePageModule" },
  // { path: "jobs", loadChildren: "./pages/jobs/jobs.module#JobsPageModule" },
  // { path: "users", loadChildren: "./pages/users/users.module#UsersPageModule" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
