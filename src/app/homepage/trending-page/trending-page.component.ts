import { Component, OnInit } from '@angular/core';
import { MainPageService } from '../main-page.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.scss']
})
export class TrendingPageComponent implements OnInit {
  public trendingTopics: any;

  constructor(
    private mainPageService: MainPageService
    ) { }

  ngOnInit(): void {
    this.mainPageService.getTrendingTags().subscribe(data => {
      this.trendingTopics = data;
    });
  }


}
