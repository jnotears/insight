import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'admin-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private readonly router: Router
  ) {
    if (!localStorage.getItem('current_user') || !localStorage.getItem('access_token')) {
        this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
  }

}
