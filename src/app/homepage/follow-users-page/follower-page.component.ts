import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FollowService } from './service/follow.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-follower-page',
  templateUrl: './follower-page.component.html',
  styleUrls: ['./follower-page.component.scss']
})
export class FollowerPageComponent implements OnInit {
  public users: any;
  public currentUser: any;
  public followerCount: number;
  public isFollowing: boolean;
  public following = [];
  private followingSubscription: Subscription;
  private followerSubscription: Subscription;

  constructor(
    public authService: AuthService,
    public followService: FollowService
  ) { }

  public ngOnInit(): void {
    this.currentUser = this.authService.userDetails;
    this.followService.getAllUsers().subscribe(data => {
      this.users = data;
    });
    this.followService.getFollowingUsers(this.currentUser.uid).subscribe(data => {
      const following = [];
      data.forEach(value => {
        following.push(value.followedId);
      });
      this.following = following;
    });
  }

  public isFollowingUser(userId) {
    return this.following.indexOf(userId) > -1
  }

  public toggleFollow(user) {
    const userId = user.uid
    const currentUserId = this.currentUser.uid
    if (this.isFollowingUser(userId)) {
      this.followingSubscription = this.followService.getDocumentIdToRemoveFollower(currentUserId, userId, 'following', 'followedId')
      .subscribe(data => {
        if(data.length !== 0) {
          data.forEach(value => {
            this.followService.removeFollowerFromFirebase(currentUserId, value.payload.doc.id, 'following').then();
          });
          this.followingSubscription.unsubscribe();
        }
      });
      this.followerSubscription = this.followService.getDocumentIdToRemoveFollower(userId, currentUserId, 'followers', 'followerId')
      .subscribe(data => {
        if(data.length !== 0) {
          data.forEach(value => {
            this.followService.removeFollowerFromFirebase(userId, value.payload.doc.id, 'followers').then();
          });
          this.followerSubscription.unsubscribe();
        }
      });
    } else {
      this.followService.follow(currentUserId, userId).then(data => {});
    }
  }
}
