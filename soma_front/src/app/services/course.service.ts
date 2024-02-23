import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

   private apiUrl = 'http://127.0.0.1:8000/api/course/'; 

  constructor(private http: HttpClient) {}

  submitCourse(formData: any): Observable<any> {
    const endpoint = `${this.apiUrl}`; 
    return this.http.post(endpoint, formData);
  }


  getCourse(): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    return this.http.get(endpoint);
  }


 
}
