import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VarService {
  constructor(private http: HttpClient) {}

  getData(variableUrl: string): Observable<any> {
    console.log(variableUrl);
    return this.http.get(variableUrl);
  }

  queryData(url: string, data?: any): Observable<any> {
    return this.http.post(url, data ? data : {});
  }

  // updateData(variableId: string): Observable<any> {
  //   return this.http.put(`/api/update/${variableId}`, {});
  // }

  // getLink(variableId: string): Observable<any> {
  //   return this.http.get(`/api/link/${variableId}`);
  // }
}
