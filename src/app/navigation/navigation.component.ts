import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public links: Array<{ text: string, path: string }> = [];

  constructor(
  ) { }

  ngOnInit() {
    this.links.push(
      { text: 'Main page', path: 'main-page' },
      { text: 'Homepage', path: 'homepage' },
      { text: 'Login', path: 'login' }
    );
  }

}
