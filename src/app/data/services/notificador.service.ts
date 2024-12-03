import { Injectable } from '@angular/core';
import { DdNotifierComponent } from '../../presentation/shared/components/dd-notifier/dd-notifier.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
