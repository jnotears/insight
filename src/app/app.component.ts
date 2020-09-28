import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Insight';
  constructor(
    private readonly router: Router
  ){
    if (!localStorage.getItem('current_user') || !localStorage.getItem('current_user')) {
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['admin']);
    }
  }
}
