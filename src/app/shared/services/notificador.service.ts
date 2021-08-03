import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DdNotifierComponent } from '../components/dd-notifier/dd-notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotificadorService {

  constructor(private _matSnackBar: MatSnackBar) { }

  showNotification(displayMessage: string, buttonText: string) {

    this._matSnackBar.openFromComponent(DdNotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
      },
      duration: 2800,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'success'
    });
  }
}
