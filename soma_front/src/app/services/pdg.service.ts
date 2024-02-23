import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class pdgService {
  private apiUrl = 'http://localhost:8000/api'; // Replace this with your Django backend API URL

  constructor(private http: HttpClient) { }

  generateTranscript(studentId: number): Observable<Blob> {
    const url = `${this.apiUrl}/generate-transcript/${studentId}/`;
    return this.http.get(url,{ responseType: 'blob' });
  }

}




