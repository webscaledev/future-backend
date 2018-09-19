import { Component, Input, OnInit } from "@angular/core";
import { DatabaseService } from "../../services/database/database";

@Component({
  selector: "user-relationship",
  templateUrl: "user-relationship.html"
})
export class UserRelationshipComponent implements OnInit {
  @Input()
  currentUserId; // logged in user
  @Input()
  followId; // user to be followed/unfollowed
  isOwner: boolean;
  isFollowing: any;

  constructor(public db: DatabaseService) {}

  ngOnInit() {
    this.isOwner = this.currentUserId === this.followId;

    this.isFollowing = this.db.isFollowing(this.currentUserId, this.followId);
  }
}
