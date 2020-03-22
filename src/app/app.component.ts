import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  menuToggled: boolean;
  constructor(
  ) {}

  title = 'travel-app';

  menuToggleChanged(menuToggled: boolean) {
    this.menuToggled = menuToggled ? false : true;
  }
}
