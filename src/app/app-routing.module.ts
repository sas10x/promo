
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'gift',
    loadChildren: () => import('./screens/gift/gift.module').then( m => m.GiftPageModule)
  },
  {
    path: '',
    redirectTo: 'gift',
    pathMatch: 'full'
  },
  {
    path: 'thanks',
    loadChildren: () => import('./screens/thanks/thanks.module').then( m => m.ThanksPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./screens/admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
