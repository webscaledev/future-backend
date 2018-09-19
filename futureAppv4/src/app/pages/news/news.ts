import { Component, ViewChild } from "@angular/core";
import { Content } from "@ionic/angular";
import {
  NavController,
  NavParams,
  PopoverController,
  ModalController,
  LoadingController
} from "@ionic/angular";
import { Observable } from "rxjs/Observable";
import { SearchPage } from "../search/search";
import { ProfilePage } from "../profile/profile";
import { SharepointProvider } from "../../providers/sharepoint/sharepoint";
import { AuthProvider } from "../../providers/auth/auth";
import { tap, mergeMap, reduce, groupBy } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "page-news",
  templateUrl: "news.html"
})
export class NewsPage {
  news: Observable<any[]>;
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private sharePoint: SharepointProvider,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad NewsFeedPage");
    let loader;
    this.news = this.sharePoint.getNews("20").pipe(
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
        this.content.resize();
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
          showBackdrop: false,
          enableBackdropDismiss: true
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
        this.content.resize();
        loader.dismiss();
      })
    );
    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage, {}).then(() => {
      console.log("Welcome to profile");
    });
  }

  goToSearch() {
    this.navCtrl.push(SearchPage, {}).then(() => {
      console.log("Welcome to search");
    });
  }
}
