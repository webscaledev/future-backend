import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu';

const routes = [
  {
    path: '',
    component: MenuPage,
    outlet: 'menu'
  }
];

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class MenuPageModule {}
