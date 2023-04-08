import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'demo';

  constructor(public authService: AuthService, private router: Router) {}

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  public goToSuggestions(){
    this.router.navigate(['/suggestionList']);
  }
  public goToCompanies(){
    this.router.navigate(['/']);
  }
}
