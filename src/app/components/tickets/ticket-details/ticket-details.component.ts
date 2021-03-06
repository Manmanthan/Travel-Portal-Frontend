import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  ticket: any;
  isAdmin: boolean | undefined;
  isDataAvailable: boolean = false;
  breakpoint: number | undefined;


  constructor(
    private userService: UserService,
    private _location: Location,
    private adminService: AdminService,
    private _actRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  printPage() {
    window.print();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 965) ? 1 : 2;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getTicket(): void {
    this.isAdmin = false;
    const id = + this._actRoute.snapshot.paramMap.get('id')!;
    this.userService.getTicketById(id).subscribe((response: any) => {
      this.ticket = response;
      this.isDataAvailable = true;
    });
  }

  getTicketIfAdmin(): void {
    this.isAdmin = true;
    const id = + this._actRoute.snapshot.paramMap.get('id')!;
    this.adminService.getTicketById(id).subscribe((res: any) => {
      this.ticket = res;
      this.isDataAvailable = true;
      console.log(this.ticket);
    });
  }

  //download file uploaded by admin.
  download(): void {
    this.userService.getPdf(this.ticket.downloadLink).subscribe(
      (data) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      (error) => {
        this.openSnackBar('Error while loading file.', "Ok");
      }
    );
  }

  onclick() {
    this._location.back();
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 965) ? 1 : 2;
    //if user is admin then do a different http request.
    if (
      sessionStorage.getItem('username')?.localeCompare('admin@nagarro.com') == 0
    ) {
      this.getTicketIfAdmin();
    }
    //if user is employee then this http request , because on server
    // a employee is restricted to load only a ticket related to him
    else {
      this.getTicket();
    }
  }

}
