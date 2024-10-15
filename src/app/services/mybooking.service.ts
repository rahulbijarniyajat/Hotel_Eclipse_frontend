import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  getFoodBookings(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/food?email=${email}`);
  }

  getLaundryBookings(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hotelservice?email=${email}`);
  }

  getRoomBookings(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rooms?email=${email}`);
  }
}
