import { ProfileSkillsPage } from './profile-skills';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProfileSkillsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileSkillsPage),
    ComponentsModule
  ],
})
export class ProfileSkillsPageModule {}
