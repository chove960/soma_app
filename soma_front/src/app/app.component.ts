import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soma_front'
  constructor(private authService:AuthService,private router:Router) {}
    logout(): void {
    // Call logout method from AuthService
    this.authService.logout();
    // Redirect to the login component
    this.router.navigate(['/']);
  }
}

