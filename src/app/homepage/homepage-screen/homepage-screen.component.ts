import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../homepage.service';

@Component({
  selector: 'app-homepage-screen',
  templateUrl: './homepage-screen.component.html',
  styleUrls: ['./homepage-screen.component.scss']
})
export class HomepageScreenComponent implements OnInit {

  constructor(public homepage: HomePageService) { }

  ngOnInit() {
  }

}
