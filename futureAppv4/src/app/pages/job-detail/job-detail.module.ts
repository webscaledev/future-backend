import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { JobDetailPage } from './job-detail';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: JobDetailPage,
    outlet: 'job-detail'
  }
];

@NgModule({
  declarations: [
    JobDetailPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class JobDetailPageModule {}
