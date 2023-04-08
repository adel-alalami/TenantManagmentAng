import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Industries, Sizes } from '../entities/comany-info';
import { CompantDto, CompanyWithDetailsDTO } from '../entities/company-Dto';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companiesUrl = 'https://localhost:7215/api/Company';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<CompanyWithDetailsDTO[]> {
    return this.http
      .get<CompanyWithDetailsDTO[]>(this.companiesUrl)
      .pipe(catchError(this.handleError));
  }

  getCompany(id: number): Observable<CompantDto> {
    return this.http
      .get<CompantDto>(`${this.companiesUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  postCompany(company: CompantDto): Observable<any> {
    return this.http.post(this.companiesUrl, company);
  }
  putCompany(company: CompantDto): Observable<any> {
    return this.http.put(this.companiesUrl, company);
  }
  getIndustries(): Observable<any> {
    return this.http.get<Industries[]>(`${this.companiesUrl}/GetIndustries`);
  }
  getSizes(): Observable<any> {
    return this.http.get<Sizes[]>(`${this.companiesUrl}/GetSizes`);
  }
}
