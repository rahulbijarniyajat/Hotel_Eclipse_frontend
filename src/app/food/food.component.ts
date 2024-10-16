import { Component } from '@angular/core';
import { BookingService, food } from '../services/booking.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {
  
  mealPrices = {
    breakfast: 300,
    lunch: 500,
    dinner: 700
  };

  foodDetails: food = {
    email: '',
    foodtype: '',
    noofguests: 0,
    meal: '',
    price: 0
  };

  constructor(private bookingService: BookingService) { }

  calculatePrice() {
    const selectedMealPrice = this.mealPrices[this.foodDetails.meal as keyof typeof this.mealPrices] || 0;
    this.foodDetails.price = this.foodDetails.noofguests * selectedMealPrice;
  }

  bookFoodService() {
    this.bookingService.saveFoodService(this.foodDetails).subscribe(
      response => {
        console.log('Food service booked successfully', response);
        alert('Food service booked successfully');
        this.resetForm(); // Reset the form after booking
      },
      error => {
        console.error('Error booking food service', error);
        alert('Failed to book food service');
      }
    );
  }

  // Function to reset the form after submission
  private resetForm() {
    this.foodDetails = {
      email: '',
      foodtype: '',
      noofguests: 0,
      meal: '',
      price: 0
    };
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h1 mat-dialog-title>Your food is booked</h1>
             <div mat-dialog-actions>
               <button mat-button mat-dialog-close>OK</button>
             </div>`,
  styles: [`
    h1 {
      color: #3f51b5;
      font-size: 20px;
      text-align: center;
    }
    div[mat-dialog-actions] {
      margin-left: 45%;
    }
  `]
})
export class DialogContentExampleDialog {}
