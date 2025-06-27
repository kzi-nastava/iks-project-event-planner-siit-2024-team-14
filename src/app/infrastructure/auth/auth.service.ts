import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginResponse} from './model/login-response.model';
import {User} from './model/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../environment/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  /** Observable stream of the currently authenticated user. Emits `null` if not logged in. */
  public get user$() {
    return this.userSubject.asObservable();
  }

  public get user() { return this.userSubject.value }


  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }


  public login(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      skip: 'true',
    })

    console.log('[AuthService] Logging in...');

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/users/login`,
      { email, password },
      { headers }
    ).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.loadUserFromToken();
        //this.userSubject.next(res.user);
      }),
      catchError(err => {
        console.log('[AuthService] Login failed:', err);
        return throwError(() => err);
      })
    );
  }


  public logout() {
    console.log("[AuthService] Logging out...");
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }


  public getToken() {
    return localStorage.getItem('token');
  }

  private removeToken() {
    localStorage.removeItem('token');
  }


  private loadUserFromToken() {
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();

    if (!token || jwtHelper.isTokenExpired(token)) {
      if (token) {
        console.log('[AuthService] Token expired or invalid');
        this.removeToken();
      }
      else console.log('[AuthService] No token found');

      if (this.userSubject.value)
        this.userSubject.next(null);

      return;
    }

    const decoded = jwtHelper.decodeToken(token);
    const user: User = {
      id: NaN,
      email: decoded.sub,
      ...decoded
    };

    console.log('[AuthService] Loaded user from token:', user);
    this.userSubject.next(user);
  }


  public whoAmI() {
    return this.http.get(`${environment.apiUrl}/users/whoami`);
  }

}
