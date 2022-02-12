import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
    userName: string;
    token: string;
    expired: number;
}

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor() { }
    
    private readonly _currentUser: BehaviorSubject<UserData | undefined> = new BehaviorSubject<UserData | undefined>(undefined); 
    readonly currentUser$ = this._currentUser.asObservable();

    get currentUser(): UserData | undefined {
        let u = this._currentUser.getValue();
        if(!u)
            this.loadUser();

        return u;
    }

    private set currentUser(val: UserData | undefined) {
        this._currentUser.next(val);
    }

    setUser(JwtData:string) {
        const rawdata = this.parseJwt(JwtData);
        let u = { 
            userName: rawdata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'], 
            token: `Bearer ${JwtData}`,
            expired: rawdata.exp
        };
        localStorage.setItem('currentUser', JSON.stringify(u));
        this.currentUser = u;
    }

    removeUser() {
        localStorage.clear();
        this.currentUser = undefined;
    }

    private expired(): boolean {
        let u = localStorage.getItem('currentUser');
        if (u) {
            const timeoutDate = new Date(
                (JSON.parse(u) as UserData).expired * 1000
            );
            return new Date() > timeoutDate;
        }
        return true;
    }

    private loadUser() {
        if (!this.expired()) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string) as UserData;
        } else {
            this.removeUser();
        }
    }

    private parseJwt(token: string) {
        try {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (err) {
            this.removeUser();
            return '';
        }
    }
}
