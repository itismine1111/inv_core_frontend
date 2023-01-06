import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.css']
})
export class ConfirmOtpComponent implements OnInit {

  emailConfirmOtp: string = "";
  confirmOtpForm: FormGroup;
  apiError: Boolean = false;
  apiErrMessage: String = "";
  serverNotResponding: Boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.confirmOtpForm = new FormGroup({
      otp: new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    var temp = localStorage.getItem("inv_reset_password_email");
    this.emailConfirmOtp = temp !== null ? temp : "";

    if(this.emailConfirmOtp === ""){
      this.router.navigateByUrl("forgot-password");
    }
  }


  confirmOtpFormSubmit(form: FormGroup) {
    console.log(form.value.otp);
    console.log(form.valid);

    this.authService.confirmOtpForgotPassword(form.value.otp, this.emailConfirmOtp)
      .subscribe(
        json_res => {
          console.log(json_res);
          if (json_res['success'] === true) {
            localStorage.setItem("inv_token", json_res['data']['token']);
            console.log(localStorage.getItem("inv_token"));
            // route to reset password component
            this.router.navigateByUrl("reset-password");
          }

        },

        error => {
          console.log(error['error']);
          if (error['error']["success"] === false) {
            this.apiError = true;
            this.apiErrMessage = error['error']["message"];
            this.serverNotResponding = false;
            console.warn("Api error");
            console.warn(this.apiError);
          }
          else {
            this.serverNotResponding = true;
            console.log("Error Occured while contacting the server");
            console.warn("Server error");
            console.warn(this.serverNotResponding);
            this.apiError = false;
          }
        }
      )
  }

}
