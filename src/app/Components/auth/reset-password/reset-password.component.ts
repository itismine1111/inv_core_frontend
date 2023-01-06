import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  apiToken: string = "";
  apiError: Boolean = false;
  apiErrMessage: string = "";
  serverNotResponding: Boolean = false;
  emailResetPassword: string = "";

  constructor(private authService: AuthService, private router:Router){
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    var temp = localStorage.getItem("inv_reset_password_email");
    this.emailResetPassword = temp !== null ? temp : "";

    if(this.emailResetPassword === ""){
      this.router.navigateByUrl("forgot-password");
    }

    var temp2 = localStorage.getItem("inv_token");
    this.apiToken = temp2 !== null ? temp2 : "";

    if(this.apiToken === ""){
      this.router.navigateByUrl("forgot-password");
    }
  }

  resetPasswordFormSubmit(form: FormGroup){
    console.log(form.value.password);
    console.log(form.value.confirm_password);

    this.authService.resetPassword(form.value.password, form.value.confirm_password, this.apiToken)
    .subscribe(
      json_res => {
        console.log(json_res);
        if (json_res['success'] === true) {
          // Remove token after password reset
          localStorage.removeItem("inv_token");
          // Show message password vhange successfull and redirecting to login page
          // TODO:
          // redirect to login after 2 seconds.
          this.router.navigateByUrl("login");
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
