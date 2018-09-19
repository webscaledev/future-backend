import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage implements OnInit {
  activeSegment = "0";
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    console.log("ngOnInit SettingsPage");
  }
}
