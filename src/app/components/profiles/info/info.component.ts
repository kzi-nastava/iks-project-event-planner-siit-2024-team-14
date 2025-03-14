import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEO } from '../../../interfaces/edit-eo.model';
import { InfoService } from './info.service';
import { ChangePassword } from '../../../interfaces/change-password.model';
import {EditSPP} from '../../../interfaces/edit-spp.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user: any = null;
  showUpdateModal = false;
  showPasswordModal = false;
  passwordsDoNotMatch: boolean = false;
  oldPasswordDoesNotMatch: boolean = false;
  selectedFile: File | null = null;
  photos: string[] = [];
  selectedPhotoIndex: number = -1;
  // Deactivate modal variables
  isDeactivateModalVisible: boolean = false;
  modalTitle: string = 'Are you sure you want to deactivate your account?';
  modalMessage: string = 'This action cannot be undone.';
  okButtonDeactivate: boolean = false;
  noButton: boolean = false;
  yesButton: boolean = false;

  constructor(private infoService: InfoService, private cdRef: ChangeDetectorRef, private router: Router) {}

  editForm!: FormGroup;

  ngOnInit(): void {
    // Retrieve user first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log("User retrieved from localStorage:", this.user);

      // Now safely fetch photos
      this.fetchPhotos();
    }

    this.editForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl(''),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }


  // function for name + surname for EO
  get fullName(): string {
    return this.user ? `${this.user.name} ${this.user.surname}` : 'User Name';
  }

  getProfilePhotoUrl(): string {
    const photoFileName = this.user?.profilePhoto;
    console.log(photoFileName);
    return photoFileName
      ? `http://localhost:8080/api/organizers/get-photo/${this.user.id}?timestamp=${new Date().getTime()}`
      : '../../../../../assets/images/no_photo.jpg';
  }


  // UPDATE -------------------------------------------------------------------------

  // function that opens modal for update based on role
  openUpdateModal(event: MouseEvent): void {
    event.preventDefault();
    this.showUpdateModal = true;

    const formValues: any = {
      name: this.user.name || '',
      address: this.user.address || '',
      city: this.user.city || '',
      phoneNumber: this.user.phoneNumber || '',
    };

    if (this.user.role === 'EventOrganizer') {
      formValues.surname = this.user.surname || '';
    } else if (this.user.role === 'ServiceAndProductProvider') {
      formValues.description = this.user.description || '';
    }

    this.editForm.patchValue(formValues);

    this.cdRef.detectChanges();
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  submitUpdateForm() {
    console.log("submitEditForm called!");

    if (!this.editForm.valid) {
      console.log("Form is invalid!", this.editForm.errors);
      return;
    }

    if (this.user?.role === 'EventOrganizer') {
      this.editEO();
    } else {
      this.editSPP();
    }
  }

  editEO(): void {
    if (this.editForm.valid) {
      const editDataEO: EditEO = {
        id: this.user.id,
        name: this.editForm.value.name || '',
        surname: this.editForm.value.surname || '',
        address: this.editForm.value.address || '',
        city: this.editForm.value.city || '',
        phoneNumber: this.editForm.value.phoneNumber || '',
      };

      console.log("Sending EditEO data:", editDataEO);

      this.infoService.editEO(editDataEO).subscribe({
        next: (response: any) => {
          Object.assign(this.user, response);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.closeUpdateModal();
        },
        error: (err) => console.error('Error updating profile:', err)
      });
    }
  }


  editSPP(): void {
    if (this.editForm.valid) {
      const editDataSPP: EditSPP = {
        id: this.user.id,
        name: this.editForm.value.name || '',
        address: this.editForm.value.address || '',
        city: this.editForm.value.city || '',
        phoneNumber: this.editForm.value.phoneNumber || '',
        description: this.editForm.value.description || ''
      };

      console.log("Sending EditSpp data:", editDataSPP);

      this.infoService.editSPP(editDataSPP).subscribe({
        next: (response: any) => {
          Object.assign(this.user, response);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.closeUpdateModal();
        },
        error: (err) => console.error('Error updating profile:', err)
      });
    }
  }

  // CHANGE PASSWORD ---------------------------------------------------------------

  openPasswordModal(event: MouseEvent): void {
    event.preventDefault();
    this.showPasswordModal = true;
  }

  closePasswordModal(): void {
    this.showPasswordModal = false;
    this.passwordForm.reset();
  }

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  changePassword(): void {
    if (this.passwordForm.valid) {
      const {oldPassword, password, confirmPassword} = this.passwordForm.value;

      if (password !== confirmPassword) {
        this.passwordsDoNotMatch = true;
        return;
      }

      const passwordData: ChangePassword = {
        id: this.user.id,
        oldPassword: oldPassword || '',
        password: password || ''
      };

      this.infoService.changePassword(passwordData).subscribe({
        next: (response: any) => {
          alert('Password changed successfully!');
          this.user.password = response.password;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.closePasswordModal();
        },
        error: () => this.oldPasswordDoesNotMatch = true
      });
    }
  }

  // PHOTOS -------------------------------------------------------------------

  // profile photo - EO -----
  openFileInput(): void {
    const fileInput: HTMLInputElement | null = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }


  // handle the file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profilePhoto = e.target.result;

        localStorage.setItem('user', JSON.stringify(this.user));

        this.cdRef.detectChanges();
      };
      reader.readAsDataURL(file);

      this.changeProfilePhoto();
    }
  }

  changeProfilePhoto() {
    if (this.selectedFile) {
      const email = this.user.email || '';
      const filename = `${email}.png`;

      const photoData = new FormData();
      photoData.append('photo', this.selectedFile, filename);

      this.infoService.changeProfilePhoto(photoData, this.user.id).subscribe({
        next: (response: any) => {
          console.log('Image uploaded successfully:', response);

          const updatedImageUrl = response.imageUrl || filename;

          this.user.profilePhoto = updatedImageUrl;

          localStorage.setItem('user', JSON.stringify(this.user));

          this.cdRef.detectChanges();
        },
        error: (err: any) => {
          console.error('Error uploading profile photo:', err);
        }
      });
    }
  }

  // photos - SPP -----

  currentPhotoIndex = 0;

  prevPhoto(): void {
    if (this.photos.length > 1) {
      this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
    }
  }

  nextPhoto(): void {
    if (this.photos.length > 1) {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
    }
  }

  fetchPhotos(): void {
    if (!this.user) {
      console.warn("User is null, skipping fetchPhotos()");
      return;
    }

    const storedPhotos = localStorage.getItem('photos');

    if (storedPhotos) {
      this.photos = JSON.parse(storedPhotos);
      this.cdRef.detectChanges();
    } else if (this.user.role === 'ServiceAndProductProvider') {
      console.log("Fetching photos from backend for user ID:", this.user.id);

      this.infoService.getPhotos(this.user.id).subscribe({
        next: (photos: string[]) => {
          this.photos = photos;
          localStorage.setItem('photos', JSON.stringify(this.photos));
          console.log("PHOTOS from fetchPhotos: ", this.photos);
          this.cdRef.detectChanges();
        },
        error: (err: any) => console.error('Error fetching photos:', err)
      });
    }
  }

  openFileInputForSPP(photoIndex: number): void {
    this.selectedPhotoIndex = photoIndex;
    const fileInput: HTMLInputElement | null = document.getElementById('photo-carousel') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelectedForSPP(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Store image URL for preview
        this.photos[this.selectedPhotoIndex] = e.target.result;  // Use selectedPhotoIndex

        // Log the photos array before storing in localStorage
        console.log('Photos array before storing in localStorage:', this.photos);

        // Store the photos temporarily in localStorage for immediate preview
        localStorage.setItem('photos', JSON.stringify(this.photos));

        // Log localStorage data to verify it has been updated
        console.log('Stored photos in localStorage:', localStorage.getItem('photos'));

        // Update the view immediately
        this.cdRef.detectChanges();
      };
      reader.readAsDataURL(file);

      this.changePhotoSPP();
    }
  }

  changePhotoSPP(): void {
    if (this.selectedFile) {
      const email = this.user.email || '';
      const filename = `${email}.png`;

      const photoData = new FormData();
      photoData.set('photo', this.selectedFile, filename);

      this.infoService.changePhoto(photoData, this.user.id, this.selectedPhotoIndex).subscribe({
        next: (response: any) => {
          console.log('Image uploaded successfully:', response);
          const updatedImageUrl = response.imageUrl || filename;
          this.user.photos[this.selectedPhotoIndex] = updatedImageUrl;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.cdRef.detectChanges();
        },
        error: (err: any) => {
          console.error('Error uploading photo:', err);
        }
      })
    }
  }

  // Deactivation logic ----------------------

  openDeactivateModal(event: MouseEvent): void {
    event.preventDefault();
    this.yesButton = true;
    this.noButton = true;
    this.isDeactivateModalVisible = true;
  }

  cancelDeactivation(): void {
    this.isDeactivateModalVisible = false;
  }

  confirmDeactivation(): void {
    console.log("Deactivating account...");
    this.yesButton = false;
    this.noButton = false;

    this.infoService.deactivateAccount(this.user.id, this.user.role).subscribe({
      next: (response) => {
        console.log("ROLE in deactivate: ", this.user.role);
        this.modalTitle = 'Your account has been deactivated!';
        this.modalMessage = '';
        this.okButtonDeactivate = true;

        this.isDeactivateModalVisible = true;
      },
      error: (err) => {
        console.error('Error deactivating account:', err);
      }
    });

    this.isDeactivateModalVisible = false;
  }

  okButtonDeactivationClicked(): void {
      localStorage.clear();
      this.router.navigate(['home-guest']);
      this.isDeactivateModalVisible = false;
  }
}
