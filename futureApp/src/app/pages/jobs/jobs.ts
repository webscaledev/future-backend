import { AuthService } from "./../../services/auth/auth";
import { Component, ViewChild, OnInit } from "@angular/core";
import { NavController, Content, NavParams } from "@ionic/angular";
import { SharepointService } from "../../services/sharepoint/sharepoint";
import { ProfilePage } from "../profile/profile";
import { SearchPage } from "../search/search";
import { tap, mergeMap, flatMap, reduce, map } from "rxjs/operators";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "page-jobs",
  templateUrl: "jobs.html"
})
export class JobsPage implements OnInit {
  @ViewChild(Content)
  content: Content;
  jobs: any;
  constructor(
    public navCtrl: NavController,
    private sharePoint: SharepointService,
    public navParams: NavParams,
    public auth: AuthService,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    console.log("ngOnInit JobsPage");
    let loader;
    loader = this.loadingCtrl.create({
      spinner: "bubbles",
      showBackdrop: false
    });
    loader.present();
    this.jobs = this.sharePoint.getJobs("20").pipe(
      mergeMap(res => {
        return res;
      }),
      mergeMap((jobs: any) => {
        return this.sharePoint.getJobsItem(jobs.id).pipe(
          map(fields => {
            return { ...jobs, fields };
          })
        );
      }),
      mergeMap(async (jobs: any) => {
        let image;
        try {
          image = await this.sharePoint.getPhoto(jobs.userid);
          return { ...jobs, authorImage: image };
        } catch (error) {
          return { ...jobs, authorImage: null };
        }
      }),
      reduce((jobs, v) => {
        jobs.push(v);
        jobs.sort((a, b) => b.id - a.id);
        return jobs;
      }, []),
      tap(() => {
        loader.dismiss();
      })
    );
  }

  goToProfile() {
    this.navCtrl.navigateForward("profile").then(() => {
      console.log("Welcome to profile");
    });
  }

  goToAllJobs() {
    console.log("show all jobs");
  }

  goToSearch() {
    this.navCtrl.navigateForward("search").then(() => {
      console.log("Welcome to search");
    });
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    let loader;
    this.jobs = this.sharePoint.getJobs("20").pipe(
      tap(() => {
        loader = this.loadingCtrl.create({
          spinner: "bubbles",
          showBackdrop: false
        });
        loader.present();
      }),
      mergeMap(res => {
        return res;
      }),
      mergeMap((jobs: any) => {
        return this.sharePoint.getJobsItem(jobs.id).pipe(
          map(fields => {
            return { ...jobs, fields };
          })
        );
      }),
      mergeMap(async (jobs: any) => {
        let image;
        try {
          image = await this.sharePoint.getPhoto(jobs.userid);
          return { ...jobs, authorImage: image };
        } catch (error) {
          return { ...jobs, authorImage: null };
        }
      }),
      reduce((jobs, v) => {
        jobs.push(v);
        jobs.sort((a, b) => b.id - a.id);
        return jobs;
      }, []),
      tap(() => {
        loader.dismiss();
      })
    );

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }
}
