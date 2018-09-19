import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { TabsPage } from './tabs';

const routes = [
  {
    path: '',
    component: TabsPage,
    outlet: 'tabs'
  }
];

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class TabsModule {}
