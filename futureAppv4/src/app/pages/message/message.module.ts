import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MessagePage } from './message';
import { NlbrPipe } from './nlbr.pipe';
import { DirectivesModule } from '../../directives/directives.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: MessagePage,
    outlet: 'message'
  }
];

@NgModule({
  declarations: [
    MessagePage,
    NlbrPipe,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    DirectivesModule
  ],
})
export class MessagePageModule {}
