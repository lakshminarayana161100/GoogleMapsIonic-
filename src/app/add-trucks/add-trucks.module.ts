import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTrucksPageRoutingModule } from './add-trucks-routing.module';

import { AddTrucksPage } from './add-trucks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTrucksPageRoutingModule
  ],
  declarations: [AddTrucksPage]
})
export class AddTrucksPageModule {}
