import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

export const appRoutes: Routes = [
  { path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'
  },
  { path: 'login',
    component: LoginPageComponent,
    data: { title: 'Login page' }
  },
  {
    path: 'homepage',
    loadChildren: 'src/app/homepage/main-page.module#MainpageModule',
    canActivate: [AngularFireAuthGuard],
    data: {
      title: 'Homepage',
    }
  },
  {
    path: 'follow',
    loadChildren: 'src/app/homepage/main-page.module#MainpageModule',
    canActivate: [AngularFireAuthGuard],
    data: {
      title: 'Follow page',
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
