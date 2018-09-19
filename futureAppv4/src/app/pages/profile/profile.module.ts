import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile';
import { ComponentsModule } from '../../components/components.module';

const routes = [
  {
    path: '',
    component: ProfilePage,
    outlet: 'profile'
  }
];

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class ProfilePageModule {}
