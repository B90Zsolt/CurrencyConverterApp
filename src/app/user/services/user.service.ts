import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TokenService } from "src/app/core/services/token.service";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class UserService {
    baseUrl = `${environment.apiUrl}/user`;

    constructor(private http: HttpClient, private tokenService: TokenService) {
    }

    login(email: string, password: string): Observable<Boolean> {
        return this.http
            .post<string>(`${this.baseUrl}/login`, {
                email,
                password
            })
            .pipe(
                map((resp: string) => {
                    if(resp) {
                        this.tokenService.setUser(resp);
                    } else {
                        throw new Error("Failed to login");
                    }

                    return true;
                })
            );
    }

    logout() {
        this.tokenService.removeUser();
    }

    registration(email: string, password: string): Observable<Boolean> {
        return this.http.post<string>(`${this.baseUrl}/registration`, {
            email,
            password
        })
        .pipe(
            map((resp: string) => {
                if(resp) {
                    this.tokenService.setUser(resp);
                } else {
                    throw new Error("Failed to registration");
                }

                return true;
            })
        );
    }

    renewToken(): Observable<Boolean> {
        return this.http.get<string>(`${this.baseUrl}/renew-token`)
        .pipe(
            map((resp: string) => {
                if(resp) {
                    this.tokenService.setUser(resp);
                } else {
                    throw new Error("Failed to renew token");
                }

                return true;
            })
        );
    }
}
