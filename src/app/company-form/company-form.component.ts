import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Industries, Sizes } from '../entities/comany-info';
import { CompantDto } from '../entities/company-Dto';
import { CompanyService } from '../services/company.services';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  createCompanyForm: FormGroup;
  company?: CompantDto;
  companyId = 0;
  industries?: Industries[];
  sizes?: Sizes[];
  isImageSaved: boolean = false;
  cardImageBase64: string = '';
  fileName?: string = undefined;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createCompanyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      overview: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),
      website: new FormControl(''),
      founded: new FormControl('', [Validators.required]),
      industryId: new FormControl('', [Validators.required]),
      sizeId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (param) => {
        if (param['id'] != 0) {
          this.companyId = param['id'];
          this.createCompanyForm.controls['confirmPassword'].removeValidators(
            Validators.required
          );
          this.createCompanyForm.controls['password'].removeValidators(
            Validators.required
          );
          this.companyService.getCompany(+param['id']).subscribe({
            next: (result) => {
              for (const [key, value] of Object.entries(result)) {
                this.setFormValue(key, value);
              }
            },
          });
        }
      },
    });
    this.companyService.getIndustries().subscribe({
      next : (result) => this.industries = result,
      error : (err) => console.log(err)
    })
    this.companyService.getSizes().subscribe({
      next: (result) => (this.sizes = result),
      error: (err) => console.log(err),
    });
  }
  setFormValue(key: string, value: string) {
    if (this.createCompanyForm.controls[key])
      this.createCompanyForm.controls[key].setValue(value);
  }

  createCompany(formValue: any) {
    this.company = {
      id: this.companyId,
      name: formValue.name,
      overview: formValue.overview,
      phoneNumber: formValue.phoneNumber,
      email: formValue.email,
      logo: this.cardImageBase64,
      logoName: this.fileName,
      website: formValue.website,
      founded: formValue.founded,
      industryId: formValue.industryId,
      sizeId: formValue.sizeId,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
    };
    if (this.companyId == 0) {
      this.companyService.postCompany(this.company).subscribe({
        next: (resutl) => {
          console.log(resutl);
          this.router.navigate(['/']);
        },
        error: (err) => console.log(err),
      });
    } else {
      this.companyService.putCompany(this.company).subscribe({
        next: (resutl) => {
          console.log(resutl);
          this.router.navigate(['/']);
        },
        error: (err) => console.log(err),
      });
    }
  }
  btnUpload() {}
  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileName = fileInput.target.files[0].name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          console.log(imgBase64Path);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
