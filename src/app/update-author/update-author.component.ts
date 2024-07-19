import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthorService } from '../service/author.service';
import { AuthorResponseDto } from '../model/AuthorResponseDto';
import { SaveAuthorDto } from '../model/SaveAuthorDto';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-author',
  standalone: true,
  templateUrl: './update-author.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./update-author.component.css']
})
export class UpdateAuthorComponent implements OnInit {
  authorId: number;
  author: AuthorResponseDto | null = null;

  constructor(private route: ActivatedRoute,
              private service: AuthorService,
              private router: Router) {
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.loadAuthor();
  }

  loadAuthor() {
    this.service.getAuthorById(this.authorId).subscribe(response => {
      this.author = response;
    });
  }

  onUpdate() {
    if (!this.author) return;

    const updatedAuthor: SaveAuthorDto = {
      name: this.author.name,
      surname: this.author.surname,
      gender: this.author.gender,
      age: this.author.age
    };

    this.service.updateAuthor(this.authorId, updatedAuthor).subscribe(response => {
      console.log('Author updated successfully:', response);
      this.router.navigate(["/authors"])
    });
  }
}
