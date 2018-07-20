import { Component, Input, ElementRef } from "@angular/core";
import { AuthProvider } from "../../providers/auth/auth";
import { IonicPage, NavController, Content, NavParams } from "ionic-angular";
import { LoadingController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "job-detail",
  templateUrl: "job-detail.html"
})
export class JobDetailPage {
  title = this.navParams.get('title');
  displayName = this.navParams.get('displayName');
  authorImage = this.navParams.get('authorImage');
  createDate = this.navParams.get('createDate');
  bericht = this.navParams.get('bericht');
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public auth: AuthProvider,
    public navParams: NavParams
  ) {}

  goBack(){
    this.navCtrl.pop();
  }
}
