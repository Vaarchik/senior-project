import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-repsonse.interface';
import { UpdateUser } from '../interfaces/update-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApi = 'api/auth';
  private signInUrl = '/signin';
  private signUpUrl = '/signup';

  constructor(
    private http: HttpClient
  ) {}

  signIn(data: {email: string, password: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.authApi + this.signInUrl,
      data,
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      }
    )
  }

  signUp(data: {email: string, password: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.authApi + this.signUpUrl,
      data,
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      }
    )
  }
}
