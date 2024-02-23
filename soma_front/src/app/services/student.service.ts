import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://127.0.0.1:8000/api/student/';

  constructor(private http: HttpClient) {}

  submitStudent(formData: any): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    return this.http.post(endpoint, formData);
  }

  getStudent(): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    return this.http.get(endpoint);
  }

  generateTranscript(studentId: number): Observable<Blob> {
    return this.http.get(`http://your-django-backend/generate-transcript/${studentId}/`, { responseType: 'blob' });
  }

  getStudentsWithModules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}students/with-modules/`);
  }

  updateStudent(studentId: number, updatedStudentData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${studentId}/`, updatedStudentData);
  }

deleteStudent(studentId: number): Observable<any> {
    // Get CSRF token from cookies
    const csrftoken = this.getCookie('csrftoken');
    console.log('CSRF Token:', csrftoken);
    
    // Construct headers with CSRF token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    });

    // Send DELETE request with headers
    return this.http.delete<any>(`${this.apiUrl}delete/${studentId}/`, { headers: headers });
  }

  // Helper function to get CSRF token from cookies
  private getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return match[2];
    }
    return '';
  }

}



  

