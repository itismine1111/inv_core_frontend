import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { AuthService } from './Services/auth.service';
import { ForgotPasswordComponent } from './Components/auth/forgot-password/forgot-password.component';
import { ConfirmOtpComponent } from './Components/auth/confirm-otp/confirm-otp.component';
import { ResetPasswordComponent } from './Components/auth/reset-password/reset-password.component';
import { HeaderComponent } from './Components/layout/header/header.component';
import { HomepageComponent } from './Components/layout/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ConfirmOtpComponent,
    ResetPasswordComponent,
    HeaderComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
