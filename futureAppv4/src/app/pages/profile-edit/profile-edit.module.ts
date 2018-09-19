import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileEditPage } from './profile-edit';
import { ComponentsModule } from '../../components/components.module';

const routes = [
  {
    path: '',
    component: ProfileEditPage,
    outlet: 'profile-edit'
  }
];

@NgModule({
  declarations: [
    ProfileEditPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class ProfileEditPageModule {}
