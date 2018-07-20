import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagingPage } from './messaging';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MessagingPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagingPage),
    ComponentsModule
  ],
})
export class MessagingPageModule {}
