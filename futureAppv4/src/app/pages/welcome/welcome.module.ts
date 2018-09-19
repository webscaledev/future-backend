import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WelcomePage } from './welcome';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: WelcomePage,
    outlet: 'welcome'
  }
];

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class WelcomePageModule {}
