import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './core/components/error404/error404.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
        import('./currency/currency.module').then(m => m.CurrencyModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'user',
    loadChildren: () =>
        import('./user/user.module').then(m => m.UserModule),
  },
  { 
    path: '**', 
    pathMatch: 'full',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
