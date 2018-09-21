import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, ToastController } from "@ionic/angular";
import { DatabaseService, Post } from "../../../services/database/database";
import { AuthService } from "../../../services/auth/auth";
import { ImagePicker } from "@ionic-native/image-picker/ngx";

@Component({
  selector: "page-new-post",
  templateUrl: "new-post.html"
})
export class NewPostPage implements OnInit {
  post: Partial<Post> = {};
  attachments: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imagePicker: ImagePicker,
    public db: DatabaseService,
    public auth: AuthService,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {
    console.log("ngOnInit NewPostPage");
  }

  openPhotoPicker() {
    this.imagePicker.getPictures({}).then(
      results => {
        this.attachments = results;
      },
      err => {}
    );
  }

  async create(user) {
    console.log("User Post", user);
    await this.db.createPost(user.uid, this.post as Post);
    // let toast = await this.toastCtrl.create({
    //   message: 'Post has been added successfully',
    //   duration: 3000
    // });
    // await toast.present();
    // await this.dismiss();
    this.post = {};
    await this.navCtrl.navigateRoot("home");
  }

  updateURL(e) {
    this.post.img = e;
  }
}
