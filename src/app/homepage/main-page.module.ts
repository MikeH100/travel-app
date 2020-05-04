import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mainpageRoutes } from './main-page.routes';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FollowService } from './follow-users-page/service/follow.service';
import { PostPageService } from './post-page/service/post-page.service';
import { MainPageService } from './main-page.service';
import { AllPostsService } from './all-post-page/service/all-posts.service'

import { HomepageScreenComponent } from './homepage-screen/homepage-screen.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FollowerPageComponent } from './follow-users-page/follower-page.component';
import { TrendingPageComponent } from './trending-page/trending-page.component';
import { AllPostPageComponent } from './all-post-page/all-post-page.component';
import { PostPageComponent } from './post-page/post-page.component';

@NgModule({
  declarations: [
    HomepageScreenComponent,
    ProfilePageComponent,
    FollowerPageComponent,
    PostPageComponent,
    TrendingPageComponent,
    AllPostPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainpageRoutes),
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  providers: [
    MainPageService,
    FollowService,
    PostPageService,
    AllPostsService
  ]
})
export class MainpageModule { }
