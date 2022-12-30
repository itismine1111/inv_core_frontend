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
    .subscribe(json_res=>{
      localStorage.setItem("inv_token", json_res['data']['token']);
      console.log(localStorage.getItem('inv_token'));
    })
   }

}
