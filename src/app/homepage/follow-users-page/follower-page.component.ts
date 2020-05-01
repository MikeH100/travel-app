import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FollowService } from './service/follow.service';

@Component({
  selector: 'app-follower-page',
  templateUrl: './follower-page.component.html',
  styleUrls: ['./follower-page.component.scss']
})
export class FollowerPageComponent implements OnInit {
  users
  constructor(
    public authService: AuthService,
    public followService: FollowService
  ) { }

  ngOnInit(): void {
    this.followService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

}
