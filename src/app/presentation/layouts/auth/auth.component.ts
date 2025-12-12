import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth.service';

@Component({
  standalone: false,
  selector: 'km-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form: UntypedFormGroup = this.formBuilder.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
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
