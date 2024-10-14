import { Component } from '@angular/core';
import { BookingService, hotelservices } from '../services/booking.service'; // Ensure the service is correctly imported

@Component({
  selector: 'app-hotelservices',
  templateUrl: './hotelservices.component.html',
  styleUrls: ['./hotelservices.component.css'] // Updated to correct styleUrls
})
export class HotelservicesComponent {
  laundry: hotelservices = {
    email: '',
    noofclothes: 0,
    typeofwash: 'regular wash', 
    price: 0
  };

  constructor(private bookingService: BookingService) { }

  // Function to calculate price based on type of wash
  calculatePrice() {
    const washPrices: { [key: string]: number } = {
      'regular wash': 20,
      'bleach wash': 30,
      'enzyme wash': 40,
      'stone wash': 50,
      'silicone wash': 60
    };

    const selectedWashPrice = washPrices[this.laundry.typeofwash as keyof typeof washPrices] || 0;

    this.laundry.price = this.laundry.noofclothes * selectedWashPrice;
  }

  bookLaundryService() {
    if (this.laundry.noofclothes > 0 && this.laundry.email) {
      this.bookingService.saveLaundryService(this.laundry).subscribe(
        response => {
          console.log('Laundry service booked successfully', response);
          alert('Laundry service booked successfully');
          this.resetForm(); // Reset the form after booking
        },
        error => {
          console.error('Error booking laundry service', error);
          alert('Failed to book laundry service');
        }
      );
    } else {
      alert('Please fill in all required fields.'); // Alert user to fill the form
    }
  }

  // Function to reset the form after submission
  private resetForm() {
    this.laundry = {
      email: '',
      noofclothes: 0,
      typeofwash: 'regular wash', // Reset to default value
      price: 0
    };
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h1 mat-dialog-title>Laundry services Booked</h1>
             
             <div mat-dialog-actions>
               <button mat-button mat-dialog-close>OK</button>
             </div>`,
  styles: [`
    h1 {
      color: #3f51b5;
      text-align: center;
      font-size: 20px;
    }
    
    div[mat-dialog-actions] {
      margin-left:40%;
    }
  `]
})
export class DialogContentExampleDialog {}
