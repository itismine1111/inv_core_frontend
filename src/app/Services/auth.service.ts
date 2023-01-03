import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    
}
 