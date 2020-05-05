import { Component, OnInit } from '@angular/core';
import { MainPageService } from '../main-page.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.scss']
})
export class TrendingPageComponent implements OnInit {
  public trendingTopics: any;
  public postsByTag = [];

  constructor(
    private mainPageService: MainPageService
    ) { }

  ngOnInit(): void {
    this.mainPageService.getTrendingTags().subscribe(data => {
      this.trendingTopics = data;
    });
  }
  public showPostWithTag(tag: string): void {
    this.mainPageService.getPostForSelectedTag(tag).subscribe(postData => {
      this.postsByTag = postData;
    });
  }

  public backButton(): void {
    this.postsByTag = [];
  }

}
