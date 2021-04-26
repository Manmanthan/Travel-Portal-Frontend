import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets: [] | undefined;

  displayedColumns: string[] = ['tickedId', 'from', 'priority', 'travelCity', 'status', 'submitDate', 'actions'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private adminService: AdminService
  ) { }

  onRowClicked(row: any) {
    console.log(row);
    this.router.navigateByUrl(`/ticketDetail/${row.ticketId}`);
  }

  applyFilter(filterText: string) {
    this.dataSource.filter = filterText.trim().toLowerCase();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('username')!.localeCompare("admin@nagarro.com") == 0) {
      this.adminService.getAllTickets().subscribe((response: any) => {
        console.log(response);
        this.tickets = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.userService.getMyTickets().subscribe((response: any) => {
        console.log(response);
        this.tickets = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

}
