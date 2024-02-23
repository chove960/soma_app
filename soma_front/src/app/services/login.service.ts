import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/login/';
  isLoggedIn = false;
  private userIdKey = 'user_id';


  constructor(private http: HttpClient) { }

 login(formData: any): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    return this.http.post(endpoint, formData).pipe(
      tap(() => {
        // Set isLoggedIn to true upon successful login
        this.isLoggedIn = true;
      })
    );
  }
    logout(): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    return this.http.post(endpoint, {}); // Empty body for logout request
  }

storeUserId(userId: { userId: number }): void {
  console.log('Stored userId:', userId.userId);
  localStorage.setItem(this.userIdKey, userId.userId.toString());
}


getUserId(): number | null {
  const userIdStr = localStorage.getItem(this.userIdKey);
  if (userIdStr) {
    return parseInt(userIdStr, 10); // Parse string to integer with base 10
  }
  return null; // Return null if userId is not found in local storage
}


  // Retrieve user ID from localStorage


  // Remove user ID from localStorage (e.g., on logout)
  removeUserId(): void {
    localStorage.removeItem(this.userIdKey);
  }
}

