import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  SuggestionDto,
  SuggestionWithCompanyDTO,
} from '../entities/suggestion-Dto';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  private SuggestionUrl = 'https://localhost:7215/api/Suggestion';

  constructor(private http: HttpClient) {}

  getSuggestions(): Observable<SuggestionWithCompanyDTO[]> {
    return this.http
      .get<SuggestionWithCompanyDTO[]>(this.SuggestionUrl)
      .pipe(catchError(this.handleError));
  }

  postSuggestion(suggestionDto: SuggestionDto): Observable<any> {
    return this.http.post(this.SuggestionUrl, suggestionDto);
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
}
