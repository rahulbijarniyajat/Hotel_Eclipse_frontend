import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
 
  feedbackForm!: FormGroup;

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  constructor(private fb: FormBuilder,private http: HttpClient,private dialog: MatDialog) {}

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedbackData = this.feedbackForm.getRawValue();
      console.log('Feedback Data:', feedbackData); // Debugging line
      this.http.post('http://localhost:3000/user', feedbackData)
        .subscribe(
          (response: any) => {
            console.log('Feedback saved', response);
            this.openDialog('Your feedback has been submitted successfully.');
          },
          (error: any) => {
            console.error('Error saving feedback', error);
            this.openDialog('There was an error submitting your feedback. Please try again.');
          }
        );
    }
  }

  openDialog(message: string): void {
    this.dialog.open(DialogContentExampleDialog, {
      data: { message: message }
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <h1 mat-dialog-title>Feedback submitted</h1>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class DialogContentExampleDialog {
 
}
