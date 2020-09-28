import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    if (localStorage.getItem('current_user') && localStorage.getItem('access_token')) {
      this.router.navigate(['admin']);
    }
  }

  ngOnInit(): void {
  }

  onLoginGithub() {
    this.authService.loginWithGithub();
  }

}
