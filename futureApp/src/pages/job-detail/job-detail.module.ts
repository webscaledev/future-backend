import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobDetailPage } from './job-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    JobDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(JobDetailPage),
    ComponentsModule
  ],
})
export class JobDetailPageModule {}
