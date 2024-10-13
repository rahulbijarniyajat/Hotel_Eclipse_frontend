import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  foodForm: FormGroup;
  mealPrices = {
    breakfast: 200,
    lunch: 400,
    dinner: 600
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) {
    this.foodForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      noofguest: ['', [Validators.required, Validators.min(1)]],
      meal: ['', Validators.required],
      price: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.foodForm.valueChanges.subscribe(values => {
      this.calculatePrice();
    });
  }

  calculatePrice(): void {
    const noofguest = this.foodForm.get('noofguest')?.value;
    const meal = this.foodForm.get('meal')?.value as 'breakfast' | 'lunch' | 'dinner';
    const mealPrice = this.mealPrices[meal] || 0;
    const totalPrice = noofguest * mealPrice;
    this.foodForm.get('price')?.setValue(totalPrice);
  }

  onSubmit(): void {
    if (this.foodForm.valid) {
      const bookingData = this.foodForm.getRawValue();
      console.log('Booking Data:', bookingData); // Debugging line
      this.http.post('http://localhost:3000/bookings', bookingData)
        .subscribe((response: any) => {
          console.log('Booking saved', response);
          this.openDialog();
        }, (error: any) => {
          console.error('Error saving booking', error);
        });
    }
  }

  openDialog(): void {
    this.dialog.open(DialogContentExampleDialog);
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
      font-size:20px;
      text-align: center;
    }
    div[mat-dialog-actions] {
      margin-left: 45%;
    }
  `]
})
export class DialogContentExampleDialog {}
