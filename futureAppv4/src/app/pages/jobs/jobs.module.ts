import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { JobsPage } from './jobs';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: JobsPage,
    outlet: 'jobs'
  }
];

@NgModule({
  declarations: [
    JobsPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class JobsPageModule {}
