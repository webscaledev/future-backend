import { ProfileSkillEditPage } from './new-profile-skill';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProfileSkillEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileSkillEditPage),
    ComponentsModule
  ],
})
export class NewProfileSkillPageModule {}
