import { Component, OnInit } from '@angular/core';
import { PostPageService } from './service/post-page.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public postContent = '';
  public currentUser: any;
  private getDocumentIdSubscribtion: Subscription;

  constructor(
    public authService: AuthService,
    public postPageservice: PostPageService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userDetails;
  }

  public onSubmit(): void {
    this.postPageservice.postContentToFirebase(this.postContent, this.currentUser.uid);
    this.getDocumentIdSubscribtion = this.postPageservice.getDocumentIdToAddPosts(this.currentUser.uid).subscribe(data => {
      if(data.length !== 0) {
        data.forEach(value => {
          this.postPageservice.postContentToFirebase(this.postContent, this.currentUser.uid, value.payload.doc.id);
        });
        this.getDocumentIdSubscribtion.unsubscribe();
      }
    });

  }
}
