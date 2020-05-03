import { Component, OnInit } from '@angular/core';
import { PostPageService } from './service/post-page.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public postContent = '';
  public currentUser: any;

  constructor(
    public authService: AuthService,
    public postPageservice: PostPageService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userDetails;
  }

  public onSubmit(): void {
    this.postPageservice.postContentToFirebase(this.postContent, this.currentUser.uid);
  }
}
