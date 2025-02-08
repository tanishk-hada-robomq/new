import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  data = {
    email: '',
    password: '',
  }

  errorMessage: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.loginForm.form.markAllAsTouched();

    if (this.loginForm.valid) {
      this.authService.login(this.data).subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        error: (error) => {
          this.errorMessage = 'An error occurred. Please try again.';
        },
      });
    }
  }
}
