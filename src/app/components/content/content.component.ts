import { Component, Input } from '@angular/core';
import { VarService } from '../../services/variables/var.service';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor, CommonModule, NotificationComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

  @Input() selectedVariable: string = '';
  isQueryFormVisible: boolean = false;
  formData: any = {};
  currentVariableConfig: any;
  messages: string[] = [];
  queryResults: any[] = [];

  variablesConfig = [
    { id: 'topUni', name: 'Top Universities', description: "Consulta el top de universidades por año", inputFields: [
      { name: 'startDate', type: 'date' },
      { name: 'endDate', type: 'date' }
    ], urls: [
      {id: 'init', url: 'http://localhost:3000/'},
      {id: 'get', url: 'http://localhost:3000/data'},
      {id: 'query', url: 'https://www.google.com'},
      {id: 'update', url: 'https://www.google.com'},
    ]},
    { id: 'innpulsa', name: 'Innpulsa', description: "Consulta las convocatorias", inputFields: [
      { name: 'schoolName', type: 'text' }
    ], urls: [
      {id: 'init', url: 'https://www.ip/v1.0/innpulsa/init'},
      {id: 'get', url: 'https://www.ip/v1.0/innpulsa/info'},
      {id: 'query', url: 'https://www.ip/v1.0/innpulsa/query'},
      {id: 'update', url: 'https://www.ip/v1.0/innpulsa/update'},
    ]},
    { id: 'classC', name: 'Class Central', description: "Consulta oferta de cursos" ,inputFields: [
      { name: 'schoolName', type: 'text' }
    ], urls: [
      {id: 'init', url: 'https://www.google.com'},
      {id: 'get', url: 'http://localhost:3000/data'},
      {id: 'query', url: 'http://localhost:3000/data'},
      {id: 'update', url: 'https://www.google.com'},
    ]},
  ];
  

  constructor(private apiService: VarService) {}

  ngOnInit(): void {
    this.updateVariableConfig();
  }

  ngOnChanges(): void {
    this.updateVariableConfig();
    this.formData = {};
    this.queryResults = [];
    this.isQueryFormVisible = false;
  }

  updateVariableConfig(): void {
    this.currentVariableConfig = this.variablesConfig.find(variable => variable.id === this.selectedVariable) || {};
    this.formData = {};
    console.log('Current Variable Config:', this.currentVariableConfig);
    if (this.currentVariableConfig.urls != null) {
      this.queryInit();
    }
  }

  urlQuery(id: string): string {
    return this.currentVariableConfig.urls.find((url: { id: string; }) => url.id === id).url;
  }

  performAction(actionType: string) {
    if (actionType === 'get') {
      this.isQueryFormVisible = false;
      this.apiService.getData(this.urlQuery(actionType)).subscribe((message) => {
        this.messages.push(message.message);
  
        setTimeout(() => {
          this.messages.shift();
        }, 5000);
      });
      console.log('get');
    } else if (actionType === 'query') {
      if (!this.currentVariableConfig.inputFields) {
        this.apiService.queryData(this.urlQuery(actionType)).subscribe((message) => {
          this.messages.push(message);
    
          setTimeout(() => {
            this.messages.shift();
          }, 5000);
        });
      }else{
        this.isQueryFormVisible = true;
      }
    } else if (actionType === 'update') {
      this.isQueryFormVisible = false;
      // this.apiService.updateData(this.selectedVariable).subscribe((message) => {
      //   this.messages.push(message);
  
      //   setTimeout(() => {
      //     this.messages.shift();
      //   }, 5000);
      // });
      console.log('update')
    } else if (actionType === 'link') {
      this.isQueryFormVisible = false;
      // this.apiService.getLink(this.selectedVariable).subscribe((message) => {
      //   this.messages.push(message);
  
      //   setTimeout(() => {
      //     this.messages.shift();
      //   }, 5000);
      // });
      console.log('link')
    }
  }

  submitForm() {
    const urlObject = this.currentVariableConfig.urls.find((url: { id: string; }) => url.id === "query");
    this.apiService.queryData(urlObject.url, this.formData).subscribe(data => {
      this.messages.push(data.message);
    
          setTimeout(() => {
            this.messages.shift();
          }, 5000);
      console.log('Query response:', data);
    });
    this.isQueryFormVisible = false
    this.formData = {};
  }

  queryInit() {
    const urlObject = this.currentVariableConfig.urls.find((url: { id: string; }) => url.id === "init");
    this.apiService.getData(urlObject.url).subscribe((data: any[]) => {
      this.queryResults = data;
      console.log('Query init response:', this.queryResults);
    });
  }

}
