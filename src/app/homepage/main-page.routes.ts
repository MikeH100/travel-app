import { Routes } from '@angular/router';
import { HomepageScreenComponent } from './homepage-screen/homepage-screen.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FollowerPageComponent } from './follow-users-page/follower-page.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

export const mainpageRoutes: Routes = [
  {
      path: '',
      component: HomepageScreenComponent,
      canActivate: [AngularFireAuthGuard],
      data: {
        title: 'Homepage',
      }
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      title: 'Profile',
    }
  },
  {
    path: 'follow',
    component: FollowerPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      title: 'Follow',
    }
  }
];
