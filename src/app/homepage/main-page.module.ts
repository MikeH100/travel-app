import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mainpageRoutes } from './main-page.routes';
import { HomepageScreenComponent } from './homepage-screen/homepage-screen.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MainPageService } from './main-page.service';
import { FollowService } from './follow-users-page/service/follow.service';
import { PostPageService } from './post-page/service/post-page.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FollowerPageComponent } from './follow-users-page/follower-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    HomepageScreenComponent,
    ProfilePageComponent,
    FollowerPageComponent,
    PostPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainpageRoutes),
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [
    MainPageService,
    FollowService,
    PostPageService
  ]
})
export class MainpageModule { }
