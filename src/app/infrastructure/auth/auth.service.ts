import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
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


  constructor(private http: HttpClient) {
    this.loadUserFromToken();

    (window as any).auth = this;
  }


  public login(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      skip: 'true',
    })

    console.log('[AuthService] Logging in...');
    const subject = new ReplaySubject<LoginResponse>(1);

    this.http.post<LoginResponse>(
      `${environment.apiUrl}/users/login`,
      { email, password },
      { headers }
    ).subscribe({
      next: response => {
        console.log('[AuthService] Login successful.');
        const token = response.token;
        this.setToken(token);
        this.loadUserFromToken(token);
        subject.next(response);
        subject.complete();
      },
      error: err => {
        console.log('[AuthService] Login failed:', err);
        subject.error(err);
      }
    });

    return subject.asObservable();
  }


  public logout() {
    console.log("[AuthService] Logging out...");
    this.removeToken();
    this.userSubject.next(null);
  }


  public getToken() {
    return localStorage.getItem('token');
  }

  private removeToken() {
    localStorage.removeItem('token');
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }


  private loadUserFromToken(_token?: string) {
    const token = _token ?? this.getToken();
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

  loginAdmin = () => this.login('admin@gmail.com', 'admin');
  loginOrganizer = () => this.login('milicabosancic03@gmail.com', 'ana123');
  loginProvider = () => this.login('food@example.com', 'securepassword');
  // loginUser = () => this.login('', '');

}
