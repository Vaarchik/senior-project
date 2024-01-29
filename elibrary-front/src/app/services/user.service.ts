import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponse } from "../interfaces/auth-repsonse.interface";
import { UpdateUser } from "../interfaces/update-user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private authApi = 'api/auth';
    private getCurrentUserUrl = '/get_user';
    private updateUserDataUrl = '/update_user';

    constructor(
        private http: HttpClient
    ) {}

    getCurrentUser(): Observable<AuthResponse> {
        return this.http.get<AuthResponse>(
        this.authApi + this.getCurrentUserUrl,
        {
            headers: new HttpHeaders({
            'Content-Type':  'application/json'
            })
        }
        )
    }

    updateUserData(data: UpdateUser) {
        return this.http.post<AuthResponse>(
            this.authApi + this.updateUserDataUrl,
            data,
            {
                headers: new HttpHeaders({
                'Content-Type':  'application/json'
                })
            }
        )
    }
}