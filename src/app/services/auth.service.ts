import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  // Add any other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/users";
  private feedbackurl='http://localhost:8080/api/feedback'
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserData(); // Load user data on service initialization
  }

  // Login method
  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        this.userSubject.next(user); // Update user state on login
        localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
      })
    );
  }

  // Register method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // Save food booking method
  saveFoodBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/food`, bookingData);
  }

  // Save laundry booking method
  saveLaundryBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hotelservices`, bookingData);
  }

  
  feedback(feedbackData: any): Observable<any> {
    return this.http.post(this.feedbackurl, feedbackData);
  }

  getUserData(): Observable<any> {
    return this.userSubject.asObservable(); // Provide access to user data
  }

  // Logout method
  logout(): void {
    this.userSubject.next(null); // Clear user data on logout
    localStorage.removeItem('user'); // Remove user data from local storage
  }

  // Load user data from localStorage or API
  private loadUserData(): void {
    const storedUser = localStorage.getItem('user'); // Check for user in local storage
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser)); // Emit the stored user data
    } else {
      // Fetch user data from API if not in local storage
      this.http.get<User>('http://localhost:8080/api/user')
        .subscribe(user => {
          this.userSubject.next(user); // Emit the user data
          localStorage.setItem('user', JSON.stringify(user)); // Store in local storage
        }, error => {
          console.error('Error loading user data:', error);
        });
    }
  }
}
