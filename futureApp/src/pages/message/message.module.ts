import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { NlbrPipe } from './nlbr.pipe';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    MessagePage,
    NlbrPipe,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    DirectivesModule
  ],
})
export class MessagePageModule {}
