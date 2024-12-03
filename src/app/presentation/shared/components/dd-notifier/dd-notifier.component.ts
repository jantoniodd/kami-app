import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';


@Component({
  template: `
    <div></div>
    <div>{{ data.message }}</div>
    <div>
      <button mat-flat-button (click)="matSnackBarRef.dismiss()">
        {{ data.buttonText }}
      </button>
    </div>
  `,
  styleUrls: ['./dd-notifier.component.scss'],
})
export class DdNotifierComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public matSnackBarRef: MatSnackBarRef<DdNotifierComponent>
  ) { }
}
