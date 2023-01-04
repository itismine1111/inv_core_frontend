import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  apiError: Boolean = false;
  apiErrMessage: String = "";
  serverNotResponding: Boolean = false;

  constructor(private authService: AuthService){
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  forgotPasswordFormSubmit(form: FormGroup){
    console.log(form.value.email);
    console.log(form.valid);

    this.authService.forgotPassword(form.value.email)
    .subscribe(
      json_res=>{
        console.log(json_res);
      },

      error=>{
      
        console.log(error['error']);
        if(error['error']["success"]=== false){
          this.apiError = true;
          this.apiErrMessage = error['error']["message"];

          this.serverNotResponding = false;

          console.warn("Api error");
          console.warn(this.apiError);

        }
        else{
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
