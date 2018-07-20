import { ProfileExperienceEditPage } from './new-profile-experience';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProfileExperienceEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileExperienceEditPage),
    ComponentsModule
  ],
})
export class NewProfileExperiencePageModule {}
