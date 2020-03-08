import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homepageRoutes } from './homepage.routes';
import { HomepageScreenComponent } from './homepage-screen/homepage-screen.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HomePageService } from './homepage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomepageScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homepageRoutes),
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    HomePageService
  ]
})
export class HomepageModule { }
