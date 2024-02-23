import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = 'http://127.0.0.1:8000/api/enrollment/'; 

  constructor(private http: HttpClient) {}

  submitEnrollment(formData: any): Observable<any> {
    const endpoint = `${this.apiUrl}`; 
    return this.http.post(endpoint, formData);
  }


  getEnrollment(): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    return this.http.get(endpoint);
  }


  
}
