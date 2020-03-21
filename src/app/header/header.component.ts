import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter()
  opened = false;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  menuButtonClicked() {
    this.menuToggle.emit(this.opened);
  }
}
