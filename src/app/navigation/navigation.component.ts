import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public links: Array<{ text: string, path: string }> = [];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.links.push(
      { text: 'Homepage', path: 'homepage' },
    );
  }

}
