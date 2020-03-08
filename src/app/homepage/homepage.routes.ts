import { Routes } from '@angular/router';
import { HomepageScreenComponent } from '../homepage/homepage-screen/homepage-screen.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

export const homepageRoutes: Routes = [
  {
      path: '',
      component: HomepageScreenComponent,
      canActivate: [AngularFireAuthGuard],
      data: {
        title: 'Homepage',
      }
  }
];
