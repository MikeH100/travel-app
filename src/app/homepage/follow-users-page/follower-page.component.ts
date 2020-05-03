import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FollowService } from './service/follow.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-follower-page',
  templateUrl: './follower-page.component.html',
  styleUrls: ['./follower-page.component.scss']
})
export class FollowerPageComponent implements OnInit, OnDestroy {
  public users;
  public currentUser
  public followerCount: number;
  public isFollowing: boolean;
  public following = [];
  private followingSubscription: Subscription;
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
      this.followingSubscription = this.followService.getDocumentIdToRemoveFollowing(currentUserId, userId).subscribe(data => {
        if(data.length !== 0) {
          data.forEach(value => {
            this.followService.removeFollowingFromFirebase(currentUserId, value.payload.doc.id).then();
          });
          this.followingSubscription.unsubscribe();
        }
      });
    } else {
      this.followService.follow(currentUserId, userId).then(data => {});
    }
  }


  public ngOnDestroy() {
    this.followingSubscription.unsubscribe();
  }
}
