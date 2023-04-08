import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompantDto } from '../entities/company-Dto';
import { SuggestionDto } from '../entities/suggestion-Dto';
import { CompanyService } from '../services/company.services';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css'],
})
export class CompanyDetailsComponent {
  company?: CompantDto;
  companyId = 0;
  createSuggestionForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {
    this.createSuggestionForm = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // let id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe({
      next: (param) => {
        if (param['id'] != 0) {
          this.companyId = param['id'];

          this.companyService.getCompany(+param['id']).subscribe({
            next: (result) => {
              this.company = result;
            },
          });
        }
      },
    });
  }

  createSuggestion(value: any) {
    const suggestion: SuggestionDto = {
      Id: 0,
      companyId: +(<string>localStorage.getItem('CompanyId')),
      description: value.description,
      subject: value.subject,
    };

    this.suggestionService.postSuggestion(suggestion).subscribe({
      next: (x) => {
        this.createSuggestionForm.controls['subject'].setValue(null);
        this.createSuggestionForm.controls['description'].setValue(null);
        alert('Suggestion was saved successfully');
      },
      error: (err) => console.log(err),
    });
  }
}
