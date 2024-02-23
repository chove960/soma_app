import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private apiUrl = 'http://127.0.0.1:8000/api/module/'; 

  constructor(private http: HttpClient) {}

  submitModule(formData: any): Observable<any> {
    const endpoint = `${this.apiUrl}`; 
    return this.http.post(endpoint, formData);
  }


  getModule(): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    return this.http.get(endpoint);
  }


}
