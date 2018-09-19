import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewPostPage } from './new-post';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: NewPostPage,
    outlet: 'new-post'
  }
];

@NgModule({
  declarations: [
    NewPostPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    DirectivesModule,
    ComponentsModule
  ],
})
export class NewPostPageModule {}
