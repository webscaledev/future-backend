import { AuthProvider } from "./../../providers/auth/auth";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, Content, NavParams } from "ionic-angular";
import { SharepointProvider } from "../../providers/sharepoint/sharepoint";
import { ProfilePage } from "../profile/profile";
import { SearchPage } from "../search/search";
import { tap, mergeMap, flatMap, reduce } from "rxjs/operators";
import { LoadingController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-jobs",
  templateUrl: "jobs.html"
})
export class JobsPage {
  @ViewChild(Content) content: Content;
  jobs: any;
  constructor(
    public navCtrl: NavController,
    private sharePoint: SharepointProvider,
    public navParams: NavParams,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad JobsPage");
    let loader;
    loader = this.loadingCtrl.create({
      spinner: "bubbles",
      showBackdrop: false,
      enableBackdropDismiss: true
    });
    loader.present();
    this.jobs = this.sharePoint.getJobs("20").pipe(
      mergeMap(res => {
        return res;
      }),
      mergeMap((jobs: any) => {
        return this.sharePoint.getJobsItem(jobs.id).map(fields => {
          return { ...jobs, fields };
        });
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
        this.content.resize();
        loader.dismiss();
      })
    );
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage, {}).then(() => {
      console.log("Welcome to profile");
    });
  }

  goToAllJobs() {
    console.log("show all jobs");
  }

  goToSearch() {
    this.navCtrl.push(SearchPage, {}).then(() => {
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
          showBackdrop: false,
          enableBackdropDismiss: true
        });
        loader.present();
      }),
      mergeMap(res => {
        return res;
      }),
      mergeMap((jobs: any) => {
        return this.sharePoint.getJobsItem(jobs.id).map(fields => {
          return { ...jobs, fields };
        });
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
        this.content.resize();
        loader.dismiss();
      })
    );

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }
}
