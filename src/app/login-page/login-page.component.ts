import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router
    ) { }

  ngOnInit() {
  }

  public onSubmit() {
    this.authService.signInWithGoogle().then(value => {
      this.router.navigate(['/homepage']);
    });
  }

}
