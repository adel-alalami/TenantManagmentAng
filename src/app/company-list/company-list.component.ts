import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompantDto, CompanyWithDetailsDTO } from '../entities/company-Dto';
import { CompanyService } from '../services/company.services';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: CompanyWithDetailsDTO[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private excelService: ExcelService
  ) {}

  companyForm() {
    this.router.navigate(['companyForm', 0]);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.companyService.getCompanies().subscribe({
      next: (reuslt) => {
        this.companies = reuslt;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  Edit(id: number) {
    this.router.navigate(['companyForm', id]);
  }

  exportToExcel() {
    this.excelService.exportAsExcelFile(this.companies, 'companies');
  }
}
