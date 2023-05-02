import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoragefirebasePageRoutingModule } from './storagefirebase-routing.module';

import { StoragefirebasePage } from './storagefirebase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoragefirebasePageRoutingModule
  ],
  declarations: [StoragefirebasePage]
})
export class StoragefirebasePageModule {}
