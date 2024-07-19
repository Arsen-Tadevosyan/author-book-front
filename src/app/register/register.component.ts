import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {CreateUserRequestDto} from "../model/CreateUserRequestDto";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  message: string = "";

  constructor(private fb: FormBuilder, private service: AuthenticationService) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: CreateUserRequestDto = this.registerForm.value as CreateUserRequestDto;
      this.service.register(user).subscribe(
        response => {
          console.log(response)
          this.message = 'Registration successfully you can login';
          this.resetFormFields();
        }
      )
    } else {
      this.validateAllFormFields(this.registerForm)
    }

  }

  resetFormFields() {
    this.registerForm.reset({
      name: '',
      surname: '',
      email: '',
      password: ''
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else {
          control.markAsTouched({onlySelf: true});
        }
      }
    });
  }
}
