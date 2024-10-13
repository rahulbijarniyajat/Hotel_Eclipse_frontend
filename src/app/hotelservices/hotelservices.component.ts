import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hotelservices',
  templateUrl: './hotelservices.component.html',
  styleUrls: ['./hotelservices.component.css']
})
export class HotelservicesComponent implements OnInit {
  laundryForm: FormGroup;
  washPrices = {
    'regular wash': 20,
    'bleach wash': 30,
    'enzyme wash': 40,
    'stone wash': 50,
    'silicone wash': 60
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) {
    this.laundryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      clothes: ['', [Validators.required, Validators.min(1)]],
      wash: ['', Validators.required],
      price: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.laundryForm.valueChanges.subscribe(values => {
      this.calculatePrice();
    });
  }

  calculatePrice(): void {
    const clothes = this.laundryForm.get('clothes')?.value;
    const wash = this.laundryForm.get('wash')?.value as keyof typeof this.washPrices;
    const washPrice = this.washPrices[wash] || 0;
    const totalPrice = clothes * washPrice;
    this.laundryForm.get('price')?.setValue(totalPrice);
  }

  onSubmit(): void {
    if (this.laundryForm.valid) {
      const bookingData = this.laundryForm.getRawValue();
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
