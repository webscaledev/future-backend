import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ActionSheetController } from "@ionic/angular";

@Component({
  selector: "page-connections",
  templateUrl: "connections.html",
})
export class ConnectionsPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit() {
    console.log("ngOnInit ConnectionsPage");
  }

  async openSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Sort connections by",
      cssClass: "my-action-sheet",
      buttons: [
        {
          text: "First name",
          handler: () => {
          }
        }, {
          text: "Last name",
          handler: () => {
          }
        }, {
          text: "Recently Added",
          handler: () => {
          }
        }, {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }

}
