import { Component } from '@angular/core';

@Component({
  selector: 'app-roombooking',
  templateUrl: './roombooking.component.html',
  styleUrl: './roombooking.component.css'
})
export class RoombookingComponent {
  showBookingForm = false;
  currentroomprice: number = 0;

  openBookingForm(price: number): void {
    this.currentroomprice = price;
    this.showBookingForm = true; 
  }

  closeBookingForm(): void {
    this.showBookingForm = false; 
  }

}
