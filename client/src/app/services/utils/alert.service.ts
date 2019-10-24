import { Injectable } from '@angular/core';

// add imports
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public toastr: ToastrManager
  ) { }

  public success(message: string, title: string = 'Success') {
    this.toastr.successToastr(message, title);
  }

  public error(message: string, title: string = 'Error') {
    this.toastr.errorToastr(message, title);
  }

  public warning(message: string, title: string = 'Warning') {
    this.toastr.warningToastr(message, title);
  }

  public info(message: string, title: string = 'Info') {
    this.toastr.infoToastr(message, title);
  }
}
