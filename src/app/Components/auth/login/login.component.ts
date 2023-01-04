import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  apiError: Boolean = false;
  apiErrMessage: String = "";
  serverNotResponding: Boolean = false;

  // constructor(private authService: AuthService){
  constructor(private authService: AuthService){ 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
   }

   loginFormSubmit(form: FormGroup){
    // console.log(loginForm);
    console.log(form.value.email);
    console.log(form.value.password);
    console.log(form.valid);

    this.authService.login(form.value.email, form.value.password)
    .subscribe(
      json_res=>{
      localStorage.setItem("inv_token", json_res['data']['token']);
      console.log(localStorage.getItem('inv_token'));

      this.serverNotResponding = false;
      this.apiError = false;
      },

      error=>{
      
        console.log(error['error']);
        if(error['error']["success"]=== false){
          this.apiError = true;
          this.apiErrMessage = error['error']["message"];
          // document.getElementById('api-errors-para')?.innerHTML = error['error']["message"];

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
