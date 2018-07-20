import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { CommonModule } from "@angular/common";
import { PostPopoverComponent } from "./post-popover/post-popover";
import { PostAttachmentComponent } from "./post-attachment/post-attachment";
import { PostFeedComponent } from "./post-feed/post-feed";
import { UserAvatarComponent } from "./user-avatar/user-avatar";
import { HeartButtonComponent } from "./heart-button/heart-button";
import { ImageUploadComponent } from "./image-upload/image-upload";
import { UserLogoutComponent } from "./user-logout/user-logout";
import { NewsFeedComponent } from "./news-feed/news-feed";
import { JobsFeedComponent } from "./jobs-feed/jobs-feed";
import { UserRelationshipComponent } from "./user-relationship/user-relationship";
import { NgPipesModule } from "ngx-pipes";
import { ProfileExperienceComponent } from "./profile-experience/profile-experience";
import { ProfileSkillsComponent } from "./profile-skills/profile-skills";

@NgModule({
  declarations: [
    PostPopoverComponent,
    PostAttachmentComponent,
    HeartButtonComponent,
    PostFeedComponent,
    UserAvatarComponent,
    ImageUploadComponent,
    UserLogoutComponent,
    ProfileSkillsComponent,
    ProfileExperienceComponent,
    NewsFeedComponent,
    JobsFeedComponent,
    UserRelationshipComponent
  ],
  imports: [IonicModule, CommonModule, NgPipesModule],
  entryComponents: [],
  exports: [
    PostPopoverComponent,
    PostAttachmentComponent,
    HeartButtonComponent,
    PostFeedComponent,
    UserAvatarComponent,
    ImageUploadComponent,
    ProfileSkillsComponent,
    ProfileExperienceComponent,
    UserLogoutComponent,
    NewsFeedComponent,
    JobsFeedComponent,
    UserRelationshipComponent
  ]
})
export class ComponentsModule {}
