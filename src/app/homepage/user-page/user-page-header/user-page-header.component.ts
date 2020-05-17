import { Component, OnInit, Input } from '@angular/core';
import { MainPageService } from '../../main-page.service';
import { AuthService } from '../../../auth/auth.service';
import { UserPageService } from '../service/user-page.service'
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../dialog/dialog.component';

@Component({
  selector: 'app-user-page-header',
  templateUrl: './user-page-header.component.html',
  styleUrls: ['./user-page-header.component.scss']
})
export class UserPageHeaderComponent implements OnInit {
  public _uid: string;
  public userName: any;

  public users: any;
  public currentUser: any;
  public userNames = [];
  public followerCount: number;
  public followingCount: number;
  public isFollowing: boolean;
  public followers = [];
  public following = [];
  private followingSubscription: Subscription;
  private followerSubscription: Subscription;
  private getUserName: Subscription;

  @Input()
  public set uid(value: string) {
    this._uid = value;
  }
  constructor(
    public authService: AuthService,
    public userPageService: UserPageService,
    public mainPageService: MainPageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userDetails;
    if(this._uid !== undefined) {
      this.mainPageService.getProfileData(this._uid).subscribe(profileData => {
        this.userName = profileData.userName ? profileData.userName : profileData.name;
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
        const following = [];
        data.forEach(value => {
          following.push(value.followedId);
        });
        this.following = following;
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

  public getUserNames(userArray) {
    return new Promise((resolve) =>{
      userArray.forEach((value, index, array) => {
        this.getUserName = this.mainPageService.getProfileData(value).subscribe(profileData => {
          this.userNames.push(profileData.userName ? profileData.userName : profileData.name);
          if (index === array.length -1) resolve();
        });

      });
    });
  }

  public openDialog(userArray): void {
    this.getUserNames(userArray).then(() => {
      this.getUserName.unsubscribe();
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {
          data: this.userNames,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.userNames = [];
      });
    });
  }
}
