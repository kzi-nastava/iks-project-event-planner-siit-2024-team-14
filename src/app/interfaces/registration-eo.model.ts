export interface RegistrationEo {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  address: string;
  city: string;
  phoneNumber: number;
  photo: File | null; // File input for the photo (image)
}
