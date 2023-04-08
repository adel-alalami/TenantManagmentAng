import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  SuggestionDto,
  SuggestionWithCompanyDTO,
} from '../entities/suggestion-Dto';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.css'],
})
export class SuggestionsListComponent implements OnInit {
  constructor(private suggestionService: SuggestionService) {}
  suggestions: SuggestionWithCompanyDTO[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  ngOnInit(): void {
    this.sub = this.suggestionService.getSuggestions().subscribe({
      next: (reuslt) => {
        this.suggestions = reuslt;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
