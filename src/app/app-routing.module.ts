import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmOtpComponent } from './Components/auth/confirm-otp/confirm-otp.component';
import { ForgotPasswordComponent } from './Components/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { ResetPasswordComponent } from './Components/auth/reset-password/reset-password.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  // {path:"**", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"forgot-password", component:ForgotPasswordComponent},
  {path:"confirm-otp", component:ConfirmOtpComponent},
  {path:"reset-password", component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
