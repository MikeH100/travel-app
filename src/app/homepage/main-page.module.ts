import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainpageRoutingModule } from './main-page.routes';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FollowService } from './follow-users-page/service/follow.service';
import { PostPageService } from './post-page/service/post-page.service';
import { MainPageService } from './main-page.service';
import { AllPostsService } from './all-post-page/service/all-posts.service';
import { UserPageService } from './user-page/service/user-page.service';
import { HomepageScreenComponent } from './homepage-screen/homepage-screen.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FollowerPageComponent } from './follow-users-page/follower-page.component';
import { TrendingPageComponent } from './trending-page/trending-page.component';
import { AllPostPageComponent } from './all-post-page/all-post-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    HomepageScreenComponent,
    ProfilePageComponent,
    FollowerPageComponent,
    PostPageComponent,
    TrendingPageComponent,
    AllPostPageComponent,
    UserPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MainpageRoutingModule
  ],
  providers: [
    MainPageService,
    FollowService,
    PostPageService,
    AllPostsService,
    UserPageService
  ]
})
export class MainpageModule { }
