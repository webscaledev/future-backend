import { ProfileExperiencesPage } from "./profile-experiences/profile-experiences";
import { ProfileSkillEditPage } from "./new-profile-skill/new-profile-skill";
import { ProfileExperienceEditPage } from "./new-profile-experience/new-profile-experience";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ProfilePage } from "./profile";
import { ComponentsModule } from "../../components/components.module";
import { ProfileEditPage } from "./profile-edit/profile-edit";
import { ProfileSkillsPage } from "./profile-skills/profile-skills";

const routes = [
  {
    path: "",
    component: ProfilePage,
    outlet: "profile",
    children: [
      { path: "profile-edit/:id", component: ProfileEditPage },
      {
        path: "experiences",
        component: ProfileExperiencesPage,
        children: [
          { path: "experience-edit", component: ProfileExperienceEditPage }
        ]
      },
      {
        path: "skills",
        component: ProfileSkillsPage,
        children: [{ path: "skill-edit", component: ProfileSkillEditPage }]
      }
    ]
  }
];

@NgModule({
  declarations: [ProfilePage],
  imports: [IonicModule, RouterModule.forChild(routes), ComponentsModule]
})
export class ProfilePageModule {}
