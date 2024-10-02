import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgStyle],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password
    };
    this.loginService.login(loginData).subscribe(
      (response: any) => {
        if (response) {
          const role = this.loginService.handleLoginResponse(response);
          if (role) {
            this.router.navigate(['/dashboard']);
          }
        } else {
          console.error('Login failed');
        }
      },
      (error) => {
        console.error('Error during login', error);
      }
    );
  }
}
