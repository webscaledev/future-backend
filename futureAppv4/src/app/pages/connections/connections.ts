import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html',
})
export class ConnectionsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sort connections by',
      cssClass: 'my-action-sheet',
      buttons: [
        {
          text: 'First name',
          handler: () => {
          }
        },{
          text: 'Last name',
          handler: () => {
          }
        },{
          text: 'Recently Added',
          handler: () => {
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
