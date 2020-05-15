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

  public userForm = new FormGroup({
    userName: new FormControl(''),
  });

  constructor(
    public authService: AuthService,
    private mainPageService: MainPageService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.userDetails.uid;
  }

  public onSubmit() {
    this.mainPageService.postProfileDataFirebase(this.currentUserId, this.userName).then((result) => {});
  }
}
