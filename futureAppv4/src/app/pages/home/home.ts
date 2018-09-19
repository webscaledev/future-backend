import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
}
