import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'] // Corrected from styleUrl to styleUrls
})
export class FeedbackComponent implements OnInit { // Implement OnInit

  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog,private apiService:AuthService) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    
    // if (this.feedbackForm.valid) {
      
      const feedbackData = this.feedbackForm.getRawValue();
      console.log(feedbackData)
      this.http.post('http://localhost:8080/api/feedback', feedbackData, {responseType: "text"})
        .subscribe(
          (response) => {
            // console.log('Feedback saved', response);
            alert("Feedback Saved");
            // this.openDialog('Your feedback has been submitted successfully.');
            this.feedbackForm.reset(); // Reset form after submission
          },
          // (error: any) => {
          //   console.error('Error saving feedback', error);
          //   this.openDialog('There was an error submitting your feedback. Please try again.');
          // }
        );
        // this.apiService.feedback(feedbackData).subscribe(
        //   (response)=>{
        //     console.log("submitted")
        //   },(error)=>{
        //     console.log(error);
        //   }
        // )
    
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
    <div mat-dialog-content>
      <p>{{ data.message }}</p> <!-- Show the message in the dialog -->
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {} // Inject data to display it
}
