import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemesterResultService {

   private apiUrl = 'http://127.0.0.1:8000/api/semester-result/'; 

  constructor(private http: HttpClient) {}

  submitSemesterResult(formData: any): Observable<any> {
    const endpoint = `${this.apiUrl}`; 
    return this.http.post(endpoint, formData);
  }


  getSemesterResult(): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    return this.http.get(endpoint);
  }

 
}
