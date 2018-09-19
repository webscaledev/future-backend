import { RouterModule } from "@angular/router";
import { JobDetailPage } from "../../pages/jobs/job-detail/job-detail";
import { Component, Input } from "@angular/core";
import { AuthService } from "../../services/auth/auth";
import { NavController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { Observable } from "rxjs";

@Component({
  selector: "jobs-feed",
  templateUrl: "jobs-feed.html"
})
export class JobsFeedComponent {
  @Input()
  userId: string;
  @Input()
  jobs: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private router: RouterModule,
    public loadingCtrl: LoadingController,
    public auth: AuthService
  ) {}

  goToJob(job) {
    this.navCtrl
      .navigateForward(
        `job-detail/${job.fields.Title}/${job.displayName}/${job.authorImage}/${
          job.createDate
        }/${job.fields.Bericht}`
      )
      .then(() => {
        console.log("Welcome to Job Detail");
      });
  }

  trackByFn(index, job) {
    return job.id;
  }
}
