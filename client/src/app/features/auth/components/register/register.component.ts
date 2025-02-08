import { CommonModule, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  data = {
    name: '',
    email: '',
    password: ''
  }

  errorMessage: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.registerForm.form.markAllAsTouched();

    if (this.registerForm.valid) {
      this.authService.register(this.data).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/login']);
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
