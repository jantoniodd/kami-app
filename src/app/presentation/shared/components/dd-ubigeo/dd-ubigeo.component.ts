import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, UntypedFormBuilder, UntypedFormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { JobApplicantService } from 'src/app/presentation/modules/job-applicant/job-applicant.service';

@Component({
  selector: 'dd-ubigeo',
  templateUrl: './dd-ubigeo.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdUbigeoComponent),
      multi: true,
    },
  ],
})
export class DdUbigeoComponent implements ControlValueAccessor {

  onTouched = () => { };

  form: UntypedFormGroup;

  departamentos = of([]);
  provincias = of([]);
  distritos = of([]);

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: JobApplicantService) {

    this.form = this.formBuilder.group({
      departamento: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      distrito: [null, [Validators.required]]
    });

    this.departamentos = this.service.getCombo('ubigeos');

    this.provincias = this.form.get('departamento').valueChanges.pipe(
      map((c: { id: string, nombre: string }) => (c ? c.id : null)),
      switchMap((u: string) =>
        u ? this.service.getCombo('ubigeos?ubigeo=' + u) : EMPTY
      )
    );

    this.distritos = this.form.get('provincia').valueChanges.pipe(
      map((c: { id: string, nombre: string }) => (c ? c.id : null)),
      switchMap((u: string) =>
        u ? this.service.getCombo('ubigeos?ubigeo=' + u) : EMPTY
      )
    );
  }

  writeValue(obj: any): void {
    if (obj) {
      this.form.setValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

}
