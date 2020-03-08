import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class IdentityAuthorizeGuard implements CanActivate {

  constructor(
    private router: Router,
    public firebaseAuth: AngularFireAuth,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.firebaseAuth.authState) {
        return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
