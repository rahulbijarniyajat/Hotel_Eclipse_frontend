import { Component } from '@angular/core';
import { BookingService, food } from '../services/booking.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {

  foodDetails: food = {
    email: '',
    foodtype: '',
    noofguests: 0,
    meal: '',
    price: 0
  };

  constructor(private bookingService: BookingService) { }

  calculatePrice() {
    const mealPrices: { [key: string]: number } = {
      breakfast: 300,
      lunch: 500,
      dinner: 700
    };

  
    const selectedMealPrice = mealPrices[this.foodDetails.meal as keyof typeof mealPrices] || 0;

    this.foodDetails.price = this.foodDetails.noofguests * selectedMealPrice;
  }


  bookFoodService() {
    this.bookingService.saveFoodService(this.foodDetails).subscribe(
      response => {
        console.log('Food service booked successfully', response);
        alert('Food service booked successfully');
      },
      error => {
        console.error('Error booking food service', error);
        alert('Failed to book food service');
      }
    );
  }
}
