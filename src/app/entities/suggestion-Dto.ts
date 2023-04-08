export interface SuggestionDto {
  Id: number;
  companyId?: number;
  subject: number;
  description: number;
}

export interface SuggestionWithCompanyDTO {
  id: number;
  subject: string;
  desciption: string;
  companyId: number;
  companyName: string;
}
