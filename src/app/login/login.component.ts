import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from '../entities/login-request';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  loginReq?: LoginRequest;

  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtHelper: JwtHelperService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  routeToRegister() {
    this.router.navigate(['/register']);
  }


  loginUser(formValue: any) {
    this.loginReq = {
      email: formValue.email,
      password: formValue.password,
    };

    this.authService.login(this.loginReq).subscribe({
      next: (result) => {
        if (result.isAuthSuccessful) {
          const decodedToken = this.jwtHelper.decodeToken(result.token);
          const role =
            decodedToken[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];
          localStorage.setItem('access-token', result.token);
          localStorage.setItem('role', role);
          localStorage.setItem('CompanyId', decodedToken['CompanyId']);

          if (this.authService.isCompany()) {
            this.router.navigate(['/companyDetail', decodedToken['CompanyId']]);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      error: (err) => console.log(err),
    });
  }
}
