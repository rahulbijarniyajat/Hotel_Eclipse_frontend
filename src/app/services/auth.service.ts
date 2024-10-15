import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/users"; // Base URL for user-related API calls

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials); // Ensure correct endpoint
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData); // Ensure correct endpoint
  }

  saveFoodBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/food`, bookingData);
  }

  saveLaundryBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hotelservices`, bookingData);
  }
}
