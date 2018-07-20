import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPostPage } from './new-post';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NewPostPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPostPage),
    DirectivesModule,
    ComponentsModule
  ],
})
export class NewPostPageModule {}
