import { Component, Input } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'user-avatar',
  templateUrl: 'user-avatar.html'
})
export class UserAvatarComponent {
  @Input() sizeClass: string = 'thumb';// Can be 'thumb-xs'-'thumb-sm'-'thumb-md'-'thumb-lg'
  @Input() photoURL: string;

  constructor(public auth: AuthProvider) {
  }
}
