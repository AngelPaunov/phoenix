import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/guards/auth.guard';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import("./core/authentication/authentication.module").then(m => m.AuthenticationModule) },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
