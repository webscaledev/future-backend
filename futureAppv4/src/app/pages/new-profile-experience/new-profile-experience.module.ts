import { RouterModule } from '@angular/router';
import { ProfileExperienceEditPage } from './new-profile-experience';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';

const routes = [
  {
    path: '',
    component: ProfileExperienceEditPage,
    outlet: 'profile-exp-edit'
  }
];

@NgModule({
  declarations: [
    ProfileExperienceEditPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class NewProfileExperiencePageModule {}
