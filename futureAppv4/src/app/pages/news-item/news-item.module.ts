import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewsItemPage } from './news-item';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: NewsItemPage,
    outlet: 'news-item'
  }
];

@NgModule({
  declarations: [
    NewsItemPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class NewsItemPageModule {}
