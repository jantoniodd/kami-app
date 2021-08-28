import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';

const providerInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpService, AuthService, providerInterceptor],
})
export class CoreModule { }
