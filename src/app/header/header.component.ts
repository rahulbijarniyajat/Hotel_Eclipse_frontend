import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service'; // Import User interface

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User | null = null; // Initialize user as null

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to user data from AuthService
    this.authService.user$.subscribe(user => {
      this.user = user; // Store user data in the component
    });
  }

  signOut() {
    this.authService.logout(); // Call the logout method from AuthService
  }
}
