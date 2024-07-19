import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { AuthRequestDto } from "../model/AuthRequestDto";
import { AuthenticationService } from "../service/authentication.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  loginForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private service: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user: AuthRequestDto = this.loginForm.value as AuthRequestDto;
      this.service.login(user).subscribe(
        response => {
          this.authService.setToken(response.token);
          this.message = 'You are logged in';
          this.resetFormFields();
          this.router.navigate(["/books"])
        },
        error => {
          this.message = 'Login failed';
        }
      );
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  resetFormFields() {
    this.loginForm.reset();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else {
          control.markAsTouched({ onlySelf: true });
        }
      }
    });
  }
}
