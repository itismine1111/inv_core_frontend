import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = "";
  baseURL = "http://127.0.0.1:8000/api";

  constructor(private httpClient:HttpClient) { }

  // login(email:string, password: string, device_type:string="w", device_token:string=""):Observable<any>{
  //   // console.log(email);
  //   // console.log(password);
  //   // console.log(device_type);
  //   // console.log(device_token);

  //   return(this.httpClient.post(this.baseURL + "/login/", {'email':email, 'password':password, 'device_type': device_type, 'device_token': device_token}))
  // }

  // Login Api
  login(email:string, password: string, device_type:string="w", device_token:string="")
  {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('device_type', device_type);
    formData.append('device_token', device_token);

    var data =  this.httpClient.post<any>(this.baseURL + "/login/", formData);
    return data;
  }

  // Forgot Password Api
  forgotPassword(email:string){
    const formData = new FormData();
    formData.append('email', email);
    var data = this.httpClient.post<any>(this.baseURL + "/forgot-password/", formData);
    return data;
  }

  // Confirm Otp Forgot password
  confirmOtpForgotPassword(email:string, otp:string){
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);
    formData.append("device_type", "W");
    formData.append("device_token", "");
    var data = this.httpClient.post<any>(this.baseURL + "/confirm-otp-forgot-password/", formData);
    return data;

  }

  resetPassword(password:string, confirm_password:string, token:string){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Authorization', "token" + token);

    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirm_password", confirm_password);

    var data = this.httpClient.post<any>(this.baseURL + "/reset-password/", formData, {headers});
    return data;
  }
    
}
 