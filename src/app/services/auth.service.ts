import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../entities/login-request';
import { UserRegistrationDTO } from '../entities/UserRegistrationDTO';
import { registerResponse } from '../entities/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.applicationURL + '/api/Account';
  constructor(private http: HttpClient) {}

  register(registerDtos: UserRegistrationDTO): Observable<registerResponse> {
    return this.http.post<registerResponse>(
      this.url + '/register',
      registerDtos
    );
  }

  login(loginDto: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + '/login', loginDto);
  }

  public logout() {
    localStorage.removeItem('access-token');
  }

  public isCompany() {
    return localStorage.getItem('role') == 'COMPANY';
  }

  public isLoggedIn() {
    return localStorage.getItem('access-token') != null;
  }
}
