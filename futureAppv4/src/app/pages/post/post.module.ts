import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PostPage } from './post';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: PostPage,
    outlet: 'post'
  }
];

@NgModule({
  declarations: [
    PostPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class PostPageModule {}
