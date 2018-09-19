import { Component, ViewChild, OnInit } from "@angular/core";
import { Content } from "@ionic/angular";
import {
  NavController,
  NavParams,
  PopoverController,
  ModalController,
  LoadingController
} from "@ionic/angular";
import { Observable } from "rxjs";
import { SharepointService } from "../../services/sharepoint/sharepoint";
import { AuthService } from "../../services/auth/auth";
import { tap, mergeMap, reduce, groupBy } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "page-news",
  templateUrl: "news.html"
})
export class NewsPage implements OnInit {
  news: Observable<any[]>;
  @ViewChild(Content)
  content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private sharePoint: SharepointService,
    public auth: AuthService,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    console.log("ngOnInit NewsFeedPage");
    let loader;
    this.news = this.sharePoint.getNews("20").pipe(
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
      // mergeMap((jobs: any) => {
      //   return this.sharePoint.getNewsItem(jobs.id).map(fields => {
      //     return { ...jobs, fields };
      //   });
      // }),
      // mergeMap((jobs: any) => {
      //   let image;
      //   try {
      //     image = this.sharePoint.getPhoto(jobs.userid);
      //     return { ...jobs, authorImage: image };
      //   } catch (error) {
      //     return { ...jobs, authorImage: null };
      //   }
      // }),
      reduce((news, v) => {
        news.push(v);
        news.sort(
          (a, b) =>
            +moment(b.lastModified).toDate() - +moment(a.lastModified).toDate()
        );
        return news;
      }, []),
      tap(() => {
        loader.dismiss();
      })
    );
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    let loader;
    this.news = this.sharePoint.getNews("10").pipe(
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
      // mergeMap((jobs: any) => {
      //   return this.sharePoint.getNewsItem(jobs.id).map(fields => {
      //     return { ...jobs, fields };
      //   });
      // }),
      // mergeMap(async (jobs: any) => {
      //   let image;
      //   try {
      //     image = await this.sharePoint.getPhoto(jobs.userid);
      //     return { ...jobs, authorImage: image };
      //   } catch (error) {
      //     return { ...jobs, authorImage: null };
      //   }
      // }),
      reduce((news, v) => {
        news.push(v);
        // news.sort((a, b) => b.id - a.id);
        news.sort(
          (a, b) =>
            +moment(b.lastModified).toDate() - +moment(a.lastModified).toDate()
        );
        return news;
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

  goToProfile() {
    this.navCtrl.navigateForward("profile").then(() => {
      console.log("Welcome to profile");
    });
  }

  goToSearch() {
    this.navCtrl.navigateForward("search").then(() => {
      console.log("Welcome to search");
    });
  }
}
