import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HotelservicesComponent } from './hotelservices/hotelservices.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FoodComponent } from './food/food.component';
import { RoombookingComponent } from './roombooking/roombooking.component';
import { RbheaderComponent } from './rbheader/rbheader.component';
import { BookingformComponent } from './bookingform/bookingform.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import {MatDividerModule} from '@angular/material/divider';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle, MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    FeedbackComponent,
    HotelservicesComponent,
    WelcomeComponent,
    FooterComponent,
    HeaderComponent,
    FoodComponent,
    RoombookingComponent,
    RbheaderComponent,
    BookingformComponent,
    DialogboxComponent
    
  ],
  imports: [
    BrowserModule,MatDatepickerModule,MatNativeDateModule,BrowserAnimationsModule,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,MatDialogModule,
    AppRoutingModule, ReactiveFormsModule, HttpClientModule,MatButtonModule,MatButtonToggleModule,MatIconModule,MatInputModule,MatFormFieldModule,
    MatDividerModule,
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
