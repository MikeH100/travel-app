import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MainPageService } from '../main-page.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  private currentUserId: string;
  private userName: string;
  private userData: any;

  public userForm = new FormGroup({
    userName: new FormControl(''),
  });

  constructor(
    public authService: AuthService,
    private mainPageService: MainPageService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.userDetails.uid;
    this.getProfileData();
  }

  public getProfileData(): void {
    this.mainPageService.getProfileData(this.currentUserId).subscribe(userData => {
      this.userData = userData;
      this.userName = userData?.userName
    });
  }


  public onSubmit(): void {
    this.mainPageService.postProfileDataFirebase(this.currentUserId, this.userName).then((result) => {});
  }
}
