import { ProfileExperiencesPage } from './profile-experiences';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProfileExperiencesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileExperiencesPage),
    ComponentsModule
  ],
})
export class ProfileExperiencesPageModule {}
