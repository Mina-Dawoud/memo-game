import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './splash/splash.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: SplashComponent },
  { path: 'memo', loadChildren: () => import('./memo/memo.module').then(m => m.MemoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
