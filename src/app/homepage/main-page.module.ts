import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mainpageRoutes } from './main-page.routes';
import { HomepageScreenComponent } from './homepage-screen/homepage-screen.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MainPageService } from './main-page.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  declarations: [
    HomepageScreenComponent,
    ProfilePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainpageRoutes),
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    MainPageService
  ]
})
export class MainpageModule { }
