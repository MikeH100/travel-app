import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public links: Array<{ text: string, path: string }> = [];
  public opened = false;
  public _menuToggled: string;

  @Input()
  public get menuToggled(): string {
    return this._menuToggled;
  }
  public set menuToggled(value: string) {
    if(this.authService.userDetails !== null) {
      this.opened = value ? false : true;
    }
  }


  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(
      (user) => {
        if (user) {
          this.opened = true;
        } else {
          this.opened = false;
        }
      }
    );
    this.links.push(
      { text: 'Homepage', path: 'homepage' },
    );
  }

}
