import { Component, OnInit, OnDestroy } from '@angular/core';
import { AllPostsService } from './service/all-posts.service'
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-post-page',
  templateUrl: './all-post-page.component.html',
  styleUrls: ['./all-post-page.component.scss']
})
export class AllPostPageComponent implements OnInit, OnDestroy {
  public allPosts: any;
  private getAllPostSubscrition: Subscription;
  private getUserName: Subscription;

  constructor(
    public allPostService: AllPostsService
  ) { }

  ngOnInit(): void {
    this.getAllPostSubscrition = this.allPostService.getAllPosts().subscribe(data => {
      data.forEach(value => {
        this.getUserName = this.allPostService.getUserName(value.uid).subscribe(userName => {
          value.userName = userName[0].name;
        });
      });
      this.allPosts = data;
    });
  }

  ngOnDestroy() {
    this.getAllPostSubscrition.unsubscribe();
    this.getUserName.unsubscribe();
  }
}
