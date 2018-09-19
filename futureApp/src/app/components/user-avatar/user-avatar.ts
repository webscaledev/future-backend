import { Component, Input } from "@angular/core";
import { AuthService } from "../../services/auth/auth";

@Component({
  selector: "user-avatar",
  templateUrl: "user-avatar.html"
})
export class UserAvatarComponent {
  @Input() sizeClass = "thumb"; // Can be 'thumb-xs'-'thumb-sm'-'thumb-md'-'thumb-lg'
  @Input() photoURL: string;

  constructor(public auth: AuthService) {
  }
}
