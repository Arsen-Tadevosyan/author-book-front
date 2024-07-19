import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { UserDto } from '../model/UserDto';
import { NgIf } from "@angular/common";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [NgIf],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserDto | null = null;
  userImage: SafeUrl | null = null;
  selectedFile: File | null = null;

  constructor(private auth: AuthenticationService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      this.auth.getProfile(userId).subscribe((userData) => {
        this.user = userData;
        if (userData.imagePath) {
          this.loadUserImage(userData.imagePath);
        }
      });
    }
  }

  loadUserImage(picName: string): void {
    this.auth.loadImage(picName).subscribe(imageUrl => {
      this.userImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
    }
  }

  uploadImage(): void {
    if (this.selectedFile && this.user) {
      const userId = this.user.id;
      const formData = new FormData();
      formData.append('picture', this.selectedFile);

      this.auth.uploadImage(userId, formData).subscribe((updatedUser) => {
        this.user = updatedUser;
        this.loadUserImage(updatedUser.imagePath);
      });
    }
  }
}
