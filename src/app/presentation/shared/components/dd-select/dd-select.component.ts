import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  standalone: false,
  selector: 'dd-select',
  templateUrl: './dd-select.component.html',
  styleUrls: ['./dd-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdSelectComponent),
      multi: true,
    },
  ],
})
export class DdSelectComponent implements ControlValueAccessor {
  mySelect = new UntypedFormControl();

  @Input() disabled = false;
  @Input() label: string = '';
  @Input() required: boolean = false

  options = of([]);

  @Input()
  set items(data: Observable<Array<any>>) {
    this.options = data;
  }

  private _selectValue: any;

  _onTouchedCallback = () => { };
  _onchangedCallback = (_: any) => { };

  get selectValue(): any {
    return this._selectValue;
  }

  set selectValue(value: any) {
    if (value !== this._selectValue) {
      this._selectValue = value;
      this._onchangedCallback(value);
      this.mySelect.setValue(value);
    }
    this._onTouchedCallback();
  }

  constructor() { }

  writeValue(comboBox: any): void {
    this.selectValue = comboBox;
  }

  registerOnChange(fn: any): void {
    this._onchangedCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  compareWith(x: any, y: any) {
    return x && y ? x.id === y.id : x === y;
  }
}
