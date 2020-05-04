import { Component, OnInit } from '@angular/core';
import { AllPostsService } from './service/all-posts.service'

@Component({
  selector: 'app-all-post-page',
  templateUrl: './all-post-page.component.html',
  styleUrls: ['./all-post-page.component.scss']
})
export class AllPostPageComponent implements OnInit {
  public allPosts: any;

  constructor(
    public allPostService: AllPostsService
  ) { }

  ngOnInit(): void {
    this.allPostService.getAllPosts().subscribe(data => {
      this.allPosts = data;
    });
  }

}
