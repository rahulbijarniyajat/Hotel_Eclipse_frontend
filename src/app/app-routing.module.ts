import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HotelservicesComponent } from './hotelservices/hotelservices.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FoodComponent } from './food/food.component';
import { RoombookingComponent } from './roombooking/roombooking.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'hotelservices',component: HotelservicesComponent},
  { path:'welcome',component: WelcomeComponent},
  {path:'food',component:FoodComponent},
  { path:'', redirectTo:'/welcome', pathMatch:'full'},
  {path:'roombooking',component:RoombookingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
