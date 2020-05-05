import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth/auth.service';
import { MainpageModule } from './homepage/main-page.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigSettings } from '../firebase-config';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    HeaderComponent,
    NavigationComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(ConfigSettings.config, 'angular-auth-firebase'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MainpageModule,
    AngularFireDatabaseModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AngularFireAuthGuard
  ],
  exports: [
    MatCardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
