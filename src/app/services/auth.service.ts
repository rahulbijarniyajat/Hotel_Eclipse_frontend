import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl="http://localhost:3000/users";
   constructor(private http:HttpClient) { }

   login(credentials: {email:string; password:string}):Observable<any>{
    return this.http.post(this.apiUrl,credentials);
   }
   register(userData:any):Observable<any>{
    return this.http.post(this.apiUrl,userData);
  }

  saveFoodBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/food`, bookingData);
  }

  saveLaundryBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hotelservices`, bookingData);
  }
}
