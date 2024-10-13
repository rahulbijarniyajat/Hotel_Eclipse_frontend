import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService, Booking } from '../services/booking.service'; // Import the service
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css'],
})
export class BookingformComponent {
  bookingForm: FormGroup;
  @Input() roomprice: number = 0;
  @Output() closeForm = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private bookingService: BookingService) { // Inject BookingService
    this.bookingForm = this.fb.group({
      username: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      totalprice: [{ value: 0, disabled: true }, Validators.required],
    });

    this.bookingForm.get('checkInDate')?.valueChanges.subscribe(() => this.calculateTotalPrice());
    this.bookingForm.get('checkOutDate')?.valueChanges.subscribe(() => this.calculateTotalPrice());
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.bookingForm.valid) {
      // Create a booking object from the form values
      const booking: Booking = {
        username: this.bookingForm.value.username,
        checkindate: this.bookingForm.value.checkInDate,
        checkoutdate: this.bookingForm.value.checkOutDate,
        totalprice: this.bookingForm.value.totalprice,
      };

      // Save the booking using the BookingService
      this.bookingService.saveBooking(booking).subscribe({
        next: (savedBooking) => {
          console.log('Booking saved successfully:', savedBooking);
          this.dialog.open(DialogboxComponent, {
            width: '250px',
            enterAnimationDuration,
            exitAnimationDuration,
          }).afterClosed().subscribe(() => {
            this.closeForm.emit(); // Close the form after dialog is closed
          });
        },
        error: (err) => {
          console.error('Error saving booking:', err);
        }
      });
    }
  }

  cancel(): void {
    this.closeForm.emit(); // Emit closeForm event on cancel
  }

  calculateTotalPrice(): void {
    const checkInDateStr = this.bookingForm.get('checkInDate')?.value;
    const checkOutDateStr = this.bookingForm.get('checkOutDate')?.value;
  
    if (checkInDateStr && checkOutDateStr) {
      const checkInDate = new Date(checkInDateStr);
      const checkOutDate = new Date(checkOutDateStr);
  
      if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime()) && checkOutDate > checkInDate) {
        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        const totalPrice = daysDifference * this.roomprice;
        this.bookingForm.patchValue({ totalprice: totalPrice });
  
        console.log(`Room Price: ${this.roomprice}, Days Difference: ${daysDifference}, Total Price: ${totalPrice}`);
      } else {
        this.bookingForm.patchValue({ totalprice: 0 }); 
        console.warn('Invalid check-in or check-out date');
      }
    } else {
      this.bookingForm.patchValue({ totalprice: 0 });
    }
  }
}
