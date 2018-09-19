import { RouterModule } from '@angular/router';
import { ProfileSkillsPage } from './profile-skills';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';

const routes = [
  {
    path: '',
    component: ProfileSkillsPage,
    outlet: 'profile-skills'
  }
];

@NgModule({
  declarations: [
    ProfileSkillsPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class ProfileSkillsPageModule {}
