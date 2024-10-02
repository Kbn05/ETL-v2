import { Component } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ContentComponent } from '../../components/content/content.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass, CommonModule, TopbarComponent, SidebarComponent, ContentComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isSidebarCollapsed = false;
  isUserSidebarVisible = false;
  selectedVariable: string = '';

  onVariableSelected(variableId: string) {
    this.selectedVariable = variableId;
    console.log(this.selectedVariable);
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleUserSidebar() {
    this.isUserSidebarVisible = !this.isUserSidebarVisible;
  }
}
