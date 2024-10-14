import { Component } from '@angular/core';
 
@Component({
  selector: 'app-roombooking',
  templateUrl: './roombooking.component.html',
  styleUrl: './roombooking.component.css'
})
export class RoombookingComponent {
  showBookingForm = false;
  currentroomprice: number = 0;
  currentRoomType: string='single';

 
  openBookingForm(price: number, roomType: string) {
    this.currentroomprice = price;
    this.currentRoomType = roomType; 
    this.showBookingForm = true;
}
 
 
  closeBookingForm(): void {
    this.showBookingForm = false; 
  }
 
}