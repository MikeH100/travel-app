import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageScreenComponent } from './homepage-screen/homepage-screen.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FollowerPageComponent } from './follow-users-page/follower-page.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { PostPageComponent } from './post-page/post-page.component';
import { TrendingPageComponent } from './trending-page/trending-page.component';
import { AllPostPageComponent } from './all-post-page/all-post-page.component';
import { UserPageComponent } from './user-page/user-page.component';

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
  },
  {
    path: 'post',
    component: PostPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      title: 'Post page',
    }
  },
  {
    path: 'trending',
    component: TrendingPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      title: 'Trending page',
    }
  },
  {
    path: 'all-posts',
    component: AllPostPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      title: 'all posts page',
    }
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      title: 'User page',
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(mainpageRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class MainpageRoutingModule { }
