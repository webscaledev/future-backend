import { RouterModule } from '@angular/router';
import { ProfileSkillEditPage } from './new-profile-skill';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';

const routes = [
  {
    path: '',
    component: ProfileSkillEditPage,
    outlet: 'profile-skill-edit'
  }
];

@NgModule({
  declarations: [
    ProfileSkillEditPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class NewProfileSkillPageModule {}
