import { Validators } from '@angular/forms';

export const FORM_DATOS_PERSONALES = {
  candidateId: [null],
  documento: [null, [Validators.required]],
  numero: [null, [Validators.required]],
  nombres: [null, [Validators.required]],
  apePaterno: [null, [Validators.required]],
  apeMaterno: [null, [Validators.required]],
  fcNacimiento: [null, [Validators.required]],
  sexo: [null, [Validators.required]],
  estadoCivil: [null, [Validators.required]],
};

export const FORM_DATOS_CONTACTO = {
  ubigeo: [null, [Validators.required]],
  direccion: [null, [Validators.required]],
  telefono: [null],
  celular: [null],
  correo: [null, [Validators.email]],
};

export const FORM_DATOS_EDUCACION = {
  institucionEdu: [null, [Validators.required]],
};
