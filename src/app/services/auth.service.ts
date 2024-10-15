import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/users";
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserData();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => this.userSubject.next(user)) // Store user data on login
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  saveFoodBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/food`, bookingData);
  }

  saveLaundryBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hotelservices`, bookingData);
  }

  getUserData(): Observable<any> {
    return this.userSubject.asObservable(); // Provide access to user data
  }
  private loadUserData() {
    // Fetch user data from the backend
    this.http.get('http://localhost:8080/api/user') // Adjust the URL accordingly
      .subscribe(user => {
        this.userSubject.next(user);
      });
  }
}
