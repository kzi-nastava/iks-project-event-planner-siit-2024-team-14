export interface RegistrationSpp {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  companyDescription: string;
  address: string;
  city: string;
  phoneNumber: number;
  photo: string | null; // File input for the photo (image)
}
