import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from '@ionic/angular';
import { DatabaseProvider, Post } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {
  post: Partial<Post> = {};
  attachments: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public imagePicker: ImagePicker,
    public db: DatabaseProvider,
    public auth: AuthProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openPhotoPicker() {
    this.imagePicker.getPictures({})
      .then((results) => {
        this.attachments = results;
      }, (err) => { });
  }

  async create(user) {
    console.log('User Post', user);
    await this.db.createPost(user.uid, this.post as Post)
    // let toast = await this.toastCtrl.create({
    //   message: 'Post has been added successfully',
    //   duration: 3000
    // });
    // await toast.present();
    // await this.dismiss();
    this.post = {};
    await this.navCtrl.setRoot('HomePage');
  }

  updateURL(e) {
    this.post.img = e;
  }

}
