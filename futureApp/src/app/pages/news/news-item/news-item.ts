import { Component, Input, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { AuthService } from "../../../services/auth/auth";

@Component({
  selector: "news-item",
  templateUrl: "news-item.html"
})
export class NewsItemPage implements OnInit {
  @Input()
  newsItem;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService
  ) {}

  ngOnInit() {
    console.log("ngOnInit NewsItemPage");
  }
}
