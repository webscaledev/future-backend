import { RouterModule } from '@angular/router';
import { ProfileExperiencesPage } from './profile-experiences';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';

const routes = [
  {
    path: '',
    component: ProfileExperiencesPage,
    outlet: 'profile-exp'
  }
];

@NgModule({
  declarations: [
    ProfileExperiencesPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class ProfileExperiencesPageModule {}
