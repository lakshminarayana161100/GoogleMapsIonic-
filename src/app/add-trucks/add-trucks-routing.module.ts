import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTrucksPage } from './add-trucks.page';

const routes: Routes = [
  {
    path: '',
    component: AddTrucksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTrucksPageRoutingModule {}
