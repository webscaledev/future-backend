import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  messages: any[];
  typingMessage: string = '';
  @ViewChild(Content) content: Content;
  @ViewChild('input') myInput;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  init() {
    // TODO: can be an API response
    this.messages = [
      {
        isMe: false,
        avatar: 'assets/img/hieu.png',
        type: 'text',// text || image
        body: `Hello,
          I came across your profile and your background looks like it could be a great fit for a fast-growing company like us. So let’s get connected for further discussion.

          Thank you and looking forward to hearing from you!`,
        timestamp: 'Oct 10'
      },
      {
        isMe: true,
        type: 'text',// text || image
        body: 'Thanks for reaching out. I\'m busy creating Ionic themes..',
        timestamp: 'Oct 11'
      },
      {
        isMe: false,
        avatar: 'assets/img/hieu.png',
        type: 'text',// text || image
        body: `Wow, so excited to hear that.
          We've been waiting for so long.
          Let's grab some beer some time!
        `,
        timestamp: 'Oct 12'
      }
    ];
  }

  sendText() {
    this.messages.push({
      isMe: true,
      type: 'text',
      body: this.typingMessage,
      timestamp: 'Oct 14'
    });
    this.typingMessage = '';
    this.scrollBottom();

    this.fakeReply();
    this.focusInput();
  }

  fakeReply() {
    setTimeout(() => {
      this.messages.push({
        isMe: false,
        avatar: 'assets/img/hieu.png',
        type: 'text',
        body: 'Nice. Keep typing, bro!',
        timestamp: 'Oct 14'
      });

      this.scrollBottom();
    }, 1000);
  }

  scrollBottom() {
    this.content.resize();
    this.content.scrollTo(0, this.content.scrollHeight, 350);
  }

  focusInput() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }

}
