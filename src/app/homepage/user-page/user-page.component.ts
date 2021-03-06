import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainPageService } from '../main-page.service';
import { UserPageService } from '../user-page/service/user-page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public uid: string;
  public currentUserPostData: any;

  constructor(
    private router: Router,
    public mainPageService: MainPageService,
    public userPageService: UserPageService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.uid = navigation.extras.state ? navigation.extras.state.userId : undefined
  }

  ngOnInit(): void {
    if(this.uid) {
      this.getPostsSelectedUser();
    } else {
      this.currentUserPostData = undefined
    }
  }


  public getPostsSelectedUser(): void {
    this.mainPageService.getPostForSelectedUser(this.uid).subscribe(postData => {
      this.currentUserPostData = postData;
    });
  }
}
