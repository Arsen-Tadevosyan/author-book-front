import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, switchAll, tap, catchError } from "rxjs";
import { environment } from "../envoriment/enviroment.dev";
import { AuthRequestDto } from "../model/AuthRequestDto";
import { AuthResponseDto } from "../model/AuthResponseDto";
import { Router } from "@angular/router";
import { UserDto } from "../model/UserDto";
import { of } from 'rxjs';
import {CreateUserRequestDto} from "../model/CreateUserRequestDto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = `${environment.apiUrl}/v1/users`;
  private readonly TOKEN_KEY = 'token';
  private readonly USER_TYPE_KEY = 'userType';

  constructor(private http: HttpClient, private router: Router) {}

  login(authRequestDto: AuthRequestDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/auth`, authRequestDto).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUserRole(response.userDto.userType);
        this.setUserId(response.userDto.id.toString());
      })
    );
  }
  register(createUserRequestDto: CreateUserRequestDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}`, createUserRequestDto, {})
  }
  uploadImage(userId: number, formData: FormData): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/image/${userId}`, formData);
  }

  getProfile(userId: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/profile/${userId}`);
  }

  loadImage(imageId: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/getImage?picName=${imageId}`, { responseType: 'blob' })
      .pipe(
        map(blob => {
          const reader = new FileReader();
          return new Observable<string>(observer => {
            reader.onloadend = () => {
              observer.next(reader.result as string);
              observer.complete();
            };
            reader.readAsDataURL(blob);
          });
        }),
        switchAll(),
        catchError(error => {
          console.error('Error loading image:', error);
          return of('');
        })
      );
  }

  setUserId(id: string) {
    sessionStorage.setItem("id", id);
  }

  setToken(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  clearToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  logout() {
    console.log('Logging out');
    this.clearToken();
    this.clearUserRole();
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setUserRole(role: string) {
    sessionStorage.setItem(this.USER_TYPE_KEY, role);
  }

  getUserRole(): string | null {
    return sessionStorage.getItem(this.USER_TYPE_KEY);
  }

  clearUserRole() {
    sessionStorage.removeItem(this.USER_TYPE_KEY);
  }
}
