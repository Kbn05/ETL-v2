import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  username: string = 'Prueba';
  @Output() variableSelected: EventEmitter<string> = new EventEmitter<string>();
  visibleVariables: any[] = [];

  variables = [
    { name: 'Top Universities', id: 'topUni', roles: ['admin'] },
    { name: 'Innpulsa', id: 'innpulsa', roles: ['admin', 'user'] },
    { name: 'Class Central', id: 'classC', roles: ['admin', 'user'] }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const role = this.authService.getRole();
    this.updateVisibleVariables(role);
  }

  updateVisibleVariables(role: string) {
    this.visibleVariables = this.variables.filter(variable => variable.roles.includes(role));
  }

  selectVariable(variable: any) {
    this.variableSelected.emit(variable.id);
    console.log(this.variableSelected);
  }
}
