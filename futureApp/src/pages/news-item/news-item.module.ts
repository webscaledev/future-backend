import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsItemPage } from './news-item';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NewsItemPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsItemPage),
    ComponentsModule
  ],
})
export class NewsItemPageModule {}