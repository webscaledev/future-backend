import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: HomePage,
    outlet: 'home'
  }
];

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class HomePageModule {}
