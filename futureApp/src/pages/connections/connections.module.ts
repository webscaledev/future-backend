import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnectionsPage } from './connections';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ConnectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectionsPage),
    ComponentsModule
  ],
})
export class ConnectionsPageModule {}
