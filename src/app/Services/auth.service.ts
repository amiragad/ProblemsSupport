import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  environmentUrl: string;

  constructor(private http: HttpClient) {
    this.environmentUrl = environment.apiUrl;
  }

  Login(User: any) { 
    return this.http.post<any>(this.environmentUrl + 'Users/Login', User);
  }
  
  SignUp(User: any) { 
    return this.http.post<any>(this.environmentUrl + 'Users/InsertAccounts', User);
  }
}
