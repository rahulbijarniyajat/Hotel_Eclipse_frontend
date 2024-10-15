
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.css'
})
export class MybookingsComponent {
  foodBookings: any[] = [];
  laundryBookings: any[] = [];
  roomBookings: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    // Replace these URLs with your actual API endpoints
    this.http.get<any[]>('http://localhost:8080/api/users/food').subscribe(data => {
      this.foodBookings = data;
    });

    this.http.get<any[]>('http://localhost:8080/api/users/hotelservices').subscribe(data => {
      this.laundryBookings = data;
    });

    this.http.get<any[]>('http://localhost:8080/api/users/rooms').subscribe(data => {
      this.roomBookings = data;
    });
  }
}