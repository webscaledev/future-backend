import { JobDetailPage } from "./../../pages/job-detail/job-detail";
import { Component, Input } from "@angular/core";
import { AuthProvider } from "../../providers/auth/auth";
import { NavController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { Observable } from "rxjs/Observable";

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
    public loadingCtrl: LoadingController,
    public auth: AuthProvider
  ) {}

  goToJob(job) {
    this.navCtrl
      .push(JobDetailPage, {
        title: job.fields.Title,
        displayName: job.displayName,
        authorImage: job.authorImage,
        createDate: job.createDate,
        bericht: job.fields.Bericht
      })
      .then(() => {
        console.log("Welcome to Job Detail");
      });
  }

  trackByFn(index, job) {
    return job.id;
  }
}
