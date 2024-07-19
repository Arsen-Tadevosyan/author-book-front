import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { SearchByTitleComponent } from "../search-by-title/search-by-title.component";
import { AuthenticationService } from "../service/authentication.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SearchByTitleComponent, NgIf],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userImage: string | null = null;

  constructor(protected auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      this.auth.getProfile(userId).subscribe(userData => {
        this.userImage = userData.imagePath;
        this.loadUserImage(this.userImage);
      });
    }
  }

  loadUserImage(picName: string): void {
    this.auth.loadImage(picName).subscribe(imageData => {
      this.userImage = imageData;
    });
  }

  onLogout() {
    this.auth.logout();
  }
}
