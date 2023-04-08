import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyAuthGuard } from './guards/company-auth.guard';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: RegisterComponent,
    path: 'register',
  },
  {
    path: '',
    component: CompanyListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'companyForm/:id',
    component: CompanyFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'companyDetail/:id',
    component: CompanyDetailsComponent,
    canActivate: [CompanyAuthGuard],
  },
  {
    path: 'suggestionList',
    component: SuggestionsListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
