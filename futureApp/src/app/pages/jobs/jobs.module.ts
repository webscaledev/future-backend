import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { JobsPage } from "./jobs";
import { ComponentsModule } from "../../components/components.module";
import { RouterModule } from "@angular/router";
import { JobDetailPage } from "./job-detail/job-detail";

const routes = [
  {
    path: "",
    component: JobsPage,
    outlet: "jobs"
  },
  {
    path: "/:id",
    component: JobDetailPage,
    outlet: "job-detail"
  }
];

@NgModule({
  declarations: [
    JobsPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class JobsPageModule {}
