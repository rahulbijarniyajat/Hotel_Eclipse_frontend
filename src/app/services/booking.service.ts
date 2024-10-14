import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
 
export interface Booking{
  email: string;
  roomType:String;
  checkindate:string;
  checkoutdate:string;
  totalprice:number;
}
 
export interface food{
  email:String;
  foodtype:string;
  noofguests:number;
  meal:string;
  price:number
 
}
 
export interface hotelservices{
  email:string;
  noofclothes:number;
  typeofwash:string;
  price:number;
 
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiurl="http://localhost:3000/bookings";
  private foodApiUrl = "http://localhost:8080/api/foods";
  private laundryApiUrl="http://localhost:8080/api/laundry"
    constructor(private http: HttpClient) { }
  saveBooking(booking:Booking):Observable<Booking>{
    return this.http.post<Booking>(this.apiurl,booking);
  }
 
  saveFoodService(food: food): Observable<food> {
    return this.http.post<food>(this.foodApiUrl, food);
  }
  saveLaundryService(hotelservices: hotelservices): Observable<hotelservices> {
    return this.http.post<hotelservices>(this.laundryApiUrl, hotelservices);
  }
}