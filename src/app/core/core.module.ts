import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';

const providerInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}

@NgModule({ imports: [], providers: [HttpService, AuthService, providerInterceptor, provideHttpClient(withInterceptorsFromDi())] })
export class CoreModule { }
