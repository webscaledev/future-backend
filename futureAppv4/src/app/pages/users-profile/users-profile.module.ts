import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UsersProfilePage } from './users-profile';
import { ComponentsModule } from '../../components/components.module';

const routes = [
  {
    path: '',
    component: UsersProfilePage,
    outlet: 'user-profile'
  }
];

@NgModule({
  declarations: [
    UsersProfilePage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class UsersProfilePageModule {}
