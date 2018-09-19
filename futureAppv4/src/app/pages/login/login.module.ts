import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login';

const routes = [
  {
    path: '',
    component: LoginPage,
    outlet: 'login'
  }
];

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class LoginPageModule {}
