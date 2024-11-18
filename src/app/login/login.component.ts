import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  activeForm: 'login' | 'register' = 'login';

  // Mocked list of registered users (for demonstration)
  registeredUsers = [
    { username: 'user1', email: 'user1@example.com', password: 'password1' },
    { username: 'user2', email: 'user2@example.com', password: 'password2' }
  ];

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const userExists = this.registeredUsers.some(
        user => user.email === email && user.password === password
      );

      if (userExists) {
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/budget-planner/dashboard']);
      } else {
        this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 });
    }
  }

  register() {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;

      // Check if the email already exists
      const existingUser = this.registeredUsers.find(user => user.email === newUser.email);

      if (existingUser) {
        this.snackBar.open('User already exists. Please login.', 'Close', { duration: 3000 });
      } else {
        // Add the new user to the mock list
        this.registeredUsers.push(newUser);
        this.snackBar.open('Registration successful! Please log in.', 'Close', { duration: 3000 });
        this.toggleForm('login');
      }
    } else {
      this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 });
    }
  }
}
