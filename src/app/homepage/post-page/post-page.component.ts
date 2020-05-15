import { Component, OnInit } from '@angular/core';
import { PostPageService } from './service/post-page.service';
import { MainPageService } from '../main-page.service';

import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public postContent = '';
  public tagField = '';
  public currentUser: any;
  public currentPostData = [];
  public postForm = new FormGroup({
    postContent: new FormControl(''),
    tag: new FormControl(''),
  });

  constructor(
    public authService: AuthService,
    public postPageservice: PostPageService,
    public maingPageService: MainPageService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userDetails;
    this.getPostsCurrentUser();
  }

  public onSubmit(): void {
    this.postPageservice.postContentToFirebase(this.postContent, this.tagField, this.currentUser.uid);
    this.postPageservice.postTagToFirebase(this.tagField, this.currentUser.uid);
  }

  public getPostsCurrentUser(): void {
    this.postPageservice.getPostForCurrentUser(this.currentUser.uid).subscribe(postData => {
      this.currentPostData = postData;
    });
  }
}
