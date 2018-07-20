import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersProfilePage } from './users-profile';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UsersProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UsersProfilePage),
    ComponentsModule
  ],
})
export class UsersProfilePageModule {}
