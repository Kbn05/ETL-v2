import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setRole(role: string) {
    localStorage.setItem('role', role);
    // this.roleSubject.next(role);
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
}
