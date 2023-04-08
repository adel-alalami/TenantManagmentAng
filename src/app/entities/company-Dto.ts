export interface CompantDto {
  id: number;
  name: string;
  overview: string;
  phoneNumber: string;
  email: string;
  logo?: string;
  logoName?: string;
  website?: string;
  founded: Date;
  industryId: number;
  sizeId: number;
  password: number;
  confirmPassword: number;
}

export interface CompanyWithDetailsDTO {
  id: number;
  name: string;
  overview: string;
  phoneNumber: string;
  email: string;
  logo: string | null;
  logoName: string | null;
  website: string | null;
  founded: string;
  industryId: number;
  sizeId: number;
  sizeName: string;
  industryName: string;
}
