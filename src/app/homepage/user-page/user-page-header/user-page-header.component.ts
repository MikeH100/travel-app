import { Component, OnInit, Input } from '@angular/core';
import { MainPageService } from '../../main-page.service';
import { AuthService } from '../../../auth/auth.service';
import { UserPageService } from '../service/user-page.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page-header',
  templateUrl: './user-page-header.component.html',
  styleUrls: ['./user-page-header.component.scss']
})
export class UserPageHeaderComponent implements OnInit {
  public _uid: string;
  public userData: any;

  public users: any;
  public currentUser: any;
  public followerCount: number;
  public followingCount: number;
  public isFollowing: boolean;
  public followers = [];
  private followingSubscription: Subscription;
  private followerSubscription: Subscription;

  @Input()
  public set uid(value: string) {
    this._uid = value;
  }
  constructor(
    public authService: AuthService,
    public userPageService: UserPageService,
    public mainPageService: MainPageService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userDetails;
    if(this._uid !== undefined) {
      this.userData = this.mainPageService.getUserData(this._uid).subscribe(data => {
        this.userData = data[0];
      });

      this.userPageService.getFollowers(this._uid).subscribe(data => {
        const followers = [];
        data.forEach(value => {
          followers.push(value.followerId);
        });
        this.followers = followers;
        this.followerCount = this.followers.length;
      });

      this.userPageService.getFollowedUsers(this._uid).subscribe(data => {
        this.followingCount = data.length;
      });
    }
  }

  public isFollowingUser() {
    return this.followers.indexOf(this.currentUser.uid) > -1
  }

  public toggleFollow() {
    const currentUserId = this.currentUser.uid
    if (this.isFollowingUser()) {
      this.followingSubscription = this.userPageService.getDocumentIdToRemoveFollower(currentUserId, this._uid, 'following', 'followedId')
      .subscribe(data => {
        if(data.length !== 0) {
          data.forEach(value => {
            this.userPageService.removeFollowerFromFirebase(currentUserId, value.payload.doc.id, 'following').then();
          });
          this.followingSubscription.unsubscribe();
        }
      });
      this.followerSubscription = this.userPageService.getDocumentIdToRemoveFollower(this._uid, currentUserId, 'followers', 'followerId')
      .subscribe(data => {
        if(data.length !== 0) {
          data.forEach(value => {
            this.userPageService.removeFollowerFromFirebase(this._uid, value.payload.doc.id, 'followers').then();
          });
          this.followerSubscription.unsubscribe();
        }
      });
    } else {
      this.userPageService.follow(currentUserId, this._uid).then(data => {});
    }
  }

}
