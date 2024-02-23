import { Component } from '@angular/core';
import { AuthService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      last_name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (userId) => {
          console.log(userId);
          this.authService.storeUserId(userId);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error submitting login:', error);
          this.errorMessage = error.error && error.error.error ? error.error.error : 'An unexpected error occurred. Please try again later.';
        }
      );
    } else {
      // Form is invalid, display error message or handle accordingly
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
