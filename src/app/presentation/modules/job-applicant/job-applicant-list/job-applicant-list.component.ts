import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JobApplicantService } from '../job-applicant.service';

@Component({
  selector: 'km-job-applicant-list',
  templateUrl: './job-applicant-list.component.html',
  styleUrls: ['./job-applicant-list.component.scss'],
})
export class JobApplicantListComponent implements OnInit {
  dataStudentsList = new MatTableDataSource();

  displayedStudentsColumnsList = [
    'id',
    'numero',
    'apePaterno',
    'apeMaterno',
    'nombres',
  ];

  constructor(private service: JobApplicantService) {}

  ngOnInit(): void {
    this.service.findAll().subscribe((x) => {
      this.dataStudentsList.data = x;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    console.log(filterValue);
  }
}
