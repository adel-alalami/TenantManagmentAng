import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  RegistrationResponseDTO,
  UserRegistrationDTO,
} from '../entities/UserRegistrationDTO';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerReq?: UserRegistrationDTO;

  constructor(private router: Router, private authService: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
  routToLogin() {
    this.router.navigate(['login']);
  }

  registerUser(formValue: any) {
    this.registerReq = {
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
    };

    this.authService.register(this.registerReq).subscribe({
      next: (result) => {
        this.router.navigate(['login']);
      },
      error: (err) => console.log(err),
    });
  }
}
