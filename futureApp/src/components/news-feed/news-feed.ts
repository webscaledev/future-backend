import { HttpClient, HttpRequest } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";
import { AuthProvider } from "../../providers/auth/auth";
import { Observable } from "rxjs/Observable";
import { NavController, Platform, LoadingController } from "ionic-angular";
import { SharepointProvider } from "../../providers/sharepoint/sharepoint";
import { File } from "@ionic-native/file";
import {
  DocumentViewer,
  DocumentViewerOptions
} from "@ionic-native/document-viewer";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { LIST_ANIMATION } from "../../pages/animations/list.animation";

@Component({
  selector: "news-feed",
  templateUrl: "news-feed.html"
})
export class NewsFeedComponent implements OnInit {
  @Input() userId: string;
  @Input() news: Observable<any[]>;
  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public sharepoint: SharepointProvider,
    private platform: Platform,
    private iab: InAppBrowser,
    private document: DocumentViewer,
    public loadingCtrl: LoadingController,
    private file: File,
    private http: HttpClient,
    private transfer: FileTransfer,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {}

  async downloadAndOpenPdf(item) {
    let loader;
    // let href = item.fields.Samenvatting.match(/href="([^"]*)/)[1];
    // href = href.replace("&#58;", ":");
    console.log(item.webUrl);
    let path = null;

    loader = this.loadingCtrl.create({
      content: "Downloaden..."
    });
    loader.present();

    if (this.platform.is("ios")) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is("android")) {
      path = this.file.dataDirectory;
    }
    try {
      const transfer = this.transfer.create();
      const pdf = await transfer.download(
        encodeURI(item.webUrl),
        path + 'Nieuwsbrief' + ".pdf"
        // false,
        // {
        //   headers: { Authorization: "Bearer " + this.auth.getAccessToken() }
        // }
      );
      let url = await pdf.toURL();
      if (pdf) {
        console.log(JSON.stringify(url));
        loader.dismiss();
      }

      // await this.fileOpener
      //   .open(url, "application/pdf")
      //   .then(() => console.log("File is opened"))
      //   .catch(e => {
      //     console.log("Error opening file", JSON.stringify(e));
      //     loader.dismiss();
      //   });

      await this.document.viewDocument(
        url,
        item.mimetype,
        {},
        this.onShow,
        this.onClose,
        this.onMissingApp,
        this.onError
      );
    } catch (error) {
      console.log("ERROR", JSON.stringify(error));
      loader.dismiss();
    }
  }

  onShow() {
    console.log("show");
  }

  onClose() {
    console.log("close");
  }

  onMissingApp() {
    console.log("Missing pdf app viewer");
  }

  onError() {
    console.log("error");
  }

  trackByFn(index, post) {
    return post.id;
  }
}
