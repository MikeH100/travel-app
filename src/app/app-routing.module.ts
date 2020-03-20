import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

export const appRoutes: Routes = [
  { path: 'login',
    component: LoginPageComponent,
    data: { title: 'Login page' }
  },
  {
    path: 'homepage',
    loadChildren: 'src/app/homepage/homepage.module#HomepageModule',
    canActivate: [AngularFireAuthGuard],
    data: {
      title: 'Homepage',
    }
  },
  { path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
