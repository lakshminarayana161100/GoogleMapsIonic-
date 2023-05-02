import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'add-trucks',
    loadChildren: () => import('./add-trucks/add-trucks.module').then( m => m.AddTrucksPageModule)
  },
  {
    path: 'storagefirebase',
    loadChildren: () => import('./storagefirebase/storagefirebase.module').then( m => m.StoragefirebasePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
