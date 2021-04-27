import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-ticket-update-admin',
  templateUrl: './ticket-update-admin.component.html',
  styleUrls: ['./ticket-update-admin.component.scss']
})
export class TicketUpdateAdminComponent implements OnInit {

  historyState: any;
  isDataAvailable: boolean = false;
  _file: any;
  updateTicketForm: any;

  constructor(
    private _loc: Location,
    private _router: Router,
    private fb: FormBuilder,
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.historyState = history.state.state;
    this.isDataAvailable = true;
    if (history.state.state == null) {
      this._loc.back();
    }
    if (this.isDataAvailable == true) {
      this.updateTicketForm = new FormGroup({
        status: new FormControl(this.historyState.status),
        remarks: new FormControl(this.historyState.remarks),
        ticketId: new FormControl(this.historyState.ticketId),
      });
    }
  }

  onFileChange(event: any) {

    this._file = event.target.files;

    //fileName.substr(fileName.lastIndexOf('.')+1)
  }

  back() {
    this._loc.back();
  }

  submit() {
    //if a file is uploaded.
    if (this._file != null) {
      if (this._file.length > 0) {
        const file = this._file[0];
        /**If file uploaded is not pdf */
        if (file.type != "application/pdf") {
          this.openSnackBar("Please upload only pdf file.", "Ok");
          return false;
        }
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('ticket',
          new Blob([JSON.stringify(this.updateTicketForm.value)], {
            type: 'application/json',
          })
        );
        this.adminService.uploadFormDetails(formData).subscribe((response) => {
          this.openSnackBar('Changes Updated Succesfully.', "Ok");
          this._loc.back();
        },
          (error) => {
            console.log(error);
          });
      }
    } else {
      //if no file uploaded.
      let formData: FormData = new FormData();
      formData.append('ticket',
        new Blob([JSON.stringify(this.updateTicketForm.value)], {
          type: 'application/json',
        })
      );
      this.adminService.uploadFormDetails(formData).subscribe((response) => {
        this.openSnackBar('Changes Updated Succesfully', "Ok");
        this._loc.back();
      },
        (error) => {
          console.log(error);
        });
    }
    return;
  }

}
