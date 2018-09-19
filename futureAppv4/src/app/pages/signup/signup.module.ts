import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SignupPage } from './signup';

const routes = [
  {
    path: '',
    component: SignupPage,
    outlet: 'sign-up'
  }
];

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class SignupPageModule {}
