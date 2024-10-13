import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



export interface Booking{
  username: string;
  checkindate:string;
  checkoutdate:string;
  totalprice:number;
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiurl="http://localhost:3000/users";
    constructor(private http: HttpClient) { }
  saveBooking(booking:Booking):Observable<Booking>{
    return this.http.post<Booking>(this.apiurl,booking);
  }
}
