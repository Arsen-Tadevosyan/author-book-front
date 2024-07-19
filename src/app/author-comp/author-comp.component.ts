import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Gender} from "../model/Gender";
import {PagingResponseDto} from "../model/PagingResponseDto";
import {AuthorService} from "../service/author.service";
import {SaveAuthorDto} from "../model/SaveAuthorDto";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-author-comp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './author-comp.component.html',
  styleUrls: ['./author-comp.component.css']
})
export class AuthorCompComponent implements OnInit {

  name: string = '';
  surname: string = '';
  gender: Gender = 'MALE';
  age: number = 0;
  authors: PagingResponseDto | null = null;
  page: number = 0;
  size: number = 5;
  orderBy: string = 'id';
  order: string = 'DESC';

  constructor(private service: AuthorService,
              protected auth: AuthenticationService,
              private router: Router) {}

  editAuthor(authorId: number) {
    this.router.navigate(['/updateAuthor', authorId]);
  }
  ngOnInit() {
    this.loadAuthors();
  }

  onSubmit() {
    const author: SaveAuthorDto = {
      name: this.name,
      surname: this.surname,
      gender: this.gender,
      age: this.age
    };


    this.service.createAuthor(author).subscribe(response => {
      console.log('Author created successfully:', response);
      this.loadAuthors();
    },);

  }

  loadAuthors() {
    this.service.getAllAuthors(this.page, this.size, this.orderBy, this.order).subscribe(response => {
      this.authors = response;
    },);
  }

  nextPage() {
    this.page++;
    this.loadAuthors();
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadAuthors();
    }
  }
}
