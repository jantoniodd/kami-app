import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { JobApplicantService } from '../job-applicant.service';

import * as _moment from 'moment';
import {
  FORM_DATOS_CONTACTO,
  FORM_DATOS_EDUCACION,
  FORM_DATOS_PERSONALES,
} from './job-applicant-form';
import { CualquierCosa } from 'src/app/data/services/cualquier-cosa';
import { NotificadorService } from 'src/app/data/services/notificador.service';
const moment = _moment;

@Component({
  templateUrl: './job-applicant-form.component.html',
  styleUrls: ['./job-applicant-form.component.scss'],
})
export class JobApplicantFormComponent {

  form: UntypedFormGroup = this.formBuilder.group(
    {
      formOne: this.formBuilder.group(FORM_DATOS_PERSONALES),
      formTwo: this.formBuilder.group(FORM_DATOS_CONTACTO),
      formThree: this.formBuilder.group(FORM_DATOS_EDUCACION),
    }
  )

  orientacion: string;

  date = moment();

  tiposDocumento = of([]);
  sexos = of([]);
  estadosCivil = of([]);
  institucionEducativas = of([]);

  constructor(
    private abc: CualquierCosa,
    private formBuilder: UntypedFormBuilder,
    private service: JobApplicantService,
    private notification: NotificadorService
  ) {
    this.abc.movil$.subscribe((x) => {
      if (x) {
        this.orientacion = 'vertical';
      } else {
        this.orientacion = 'horizontal';
      }
    });

    this.tiposDocumento = this.service.getCombo('documentos-identidad');
    this.sexos = this.service.getCombo('sexos');
    this.estadosCivil = this.service.getCombo('estados-civiles');
    this.institucionEducativas = this.service.getCombo(
      'instituciones-educativas'
    );
  }

  onSubmit() {

    if (this.form.get("formOne").valid && this.form.get("formTwo").valid) {

      let formulario = Object.assign({},
        this.form.get("formOne").value,
        this.form.get("formTwo").value
      );

      console.log(formulario);

      this.service.save(formulario).subscribe(
        p => {
          this.notification.showNotification("Se creó el postulante", '');
        }
      );

    } else {
      console.error("ERROR AL GUARDAR");
    }

  }

  displayFn(value: { id: string, nombre: string }) {
    return value && value.nombre ? value.nombre : null;
  }

  _keyUp(event: any) {

    const pattern = /^[0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      
      this.form.get("formOne").get("numero").setValue(event.target.value.replace(/[^0-9]/g, ""));

      // invalid character, prevent input
    }

    
  }


}
