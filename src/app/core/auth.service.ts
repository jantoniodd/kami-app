import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //static END_POINT = environment.REST_CORE + '/auth/login';
  static END_POINT = 'http://localhost:8080/auth/login';

  private usuario: Usuario;
  private onLogin$ = new Subject<Usuario>();

  constructor(private httpService: HttpService, private router: Router) {}

  login(username: string, password: string): Observable<Usuario> {
    return this.httpService
      .authBasic(username, password)
      .post(AuthService.END_POINT)
      .pipe(
        map( (jsonToken : any) => {          
          const jwtHelper = new JwtHelperService();
          this.usuario = jsonToken; // {token:jwt} => usuario.token = jwt
          this.usuario.usuario = jwtHelper.decodeToken(jsonToken.token).usuario; // secret key is not necessary
          this.usuario.nombre = jwtHelper.decodeToken(jsonToken.token).name;
          this.usuario.roles = jwtHelper.decodeToken(jsonToken.token).role;

          this.onLogin$.next(this.usuario);
          return this.usuario;
        })
      );
  }

  onLogin(): Observable<Usuario> {
    return this.onLogin$.asObservable();
  }

  logout(): void {
    this.usuario = undefined;
    this.router.navigate(['']).then();
  }

  isAuthenticated(): boolean {
    return (
      this.usuario != null &&
      !new JwtHelperService().isTokenExpired(this.usuario.token)
    );
  }

  getToken(): string {
    return this.usuario ? this.usuario.token : undefined;
  }
}
