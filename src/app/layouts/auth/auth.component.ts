import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'km-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form: FormGroup = this.formBuilder.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  get usuario(): string {
    return this.form.get('usuario').value;
  }

  get password(): string {
    return this.form.get('password').value;
  }

  onSubmit() {
    if (!this.form.valid) return;

    this.authService.login(this.usuario, this.password).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
