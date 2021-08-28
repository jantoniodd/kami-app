import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dd-input',
  templateUrl: './dd-input.component.html',
  styleUrls: ['./dd-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdInputComponent),
      multi: true
    }
  ]
})
export class DdInputComponent implements ControlValueAccessor {

  @Input() disabled = false;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false

  @Input() icono = "";

  private _innerValue: string;

  _onTouchedCallback = () => { };
  _onchangedCallback = (_: any) => { };

  get value(): string {
    return this._innerValue;
  }

  set value(value: string) {

    if (value !== this._innerValue) {
      this._innerValue = value;
      this._onchangedCallback(value);
    }
    this._onTouchedCallback();
  }

  constructor() { }

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void { this._onchangedCallback = fn; }

  registerOnTouched(fn: any): void { this._onTouchedCallback = fn; }

  setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
}
