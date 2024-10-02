import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData);
  }

  extractRole(response: any): string {
    return response.user?.role || '';
  }

  handleLoginResponse(response: any) {
    // const role = this.extractRole(response);
    const role = 'admin';
    this.authService.setRole(role);
    return role;
  }
}
