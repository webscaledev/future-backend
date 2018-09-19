import { Component, Input } from '@angular/core';

@Component({
  selector: 'post-attachment',
  templateUrl: 'post-attachment.html'
})
export class PostAttachmentComponent {
  @Input() type: string;// Can be 'image' - 'url'

  constructor() {

  }

}
