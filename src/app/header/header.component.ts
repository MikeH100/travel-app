import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter()
  opened = true;
  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }

  menuButtonClicked() {
    this.opened = this.opened ? false : true
    this.menuToggle.emit(this.opened);
  }
}
