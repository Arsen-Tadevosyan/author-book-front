import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { BookDto } from "../model/BookDto";
import { BookService } from "../service/book.service";
import { BookFilterDto } from "../model/BookFilterDto";
import { AuthenticationService } from "../service/authentication.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  standalone: true,
  styleUrls: ['./book-search.component.css'],
  imports: [ReactiveFormsModule, NgFor, NgIf, CommonModule, RouterLink]
})
export class BookSearchComponent implements OnInit {
  filterForm!: FormGroup;
  books: BookDto[] = [];
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private fb: FormBuilder, private service: BookService, protected auth: AuthenticationService) {
    this.filterForm = this.fb.group({
      title: [''],
      description: [''],
      minPrice: [0],
      maxPrice: [10000000000000],
      orderBy: ['title'],
      orderDirection: ['asc'],
      page: [0],
      size: [10]
    });
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    const filterDto: BookFilterDto = this.filterForm.value as BookFilterDto;

    this.service.filterBooks(filterDto, this.currentPage, 10).subscribe(
      response => {
        if (response.content) {
          this.books = response.content;
          this.totalPages = response.totalPages;
        }
      }
    );
  }

  onSubmit() {
    this.currentPage = 0;
    this.loadBooks();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadBooks();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadBooks();
    }
  }

  addToFavorites(bookId: number) {
    this.service.addToFavorites(bookId).subscribe(() => {
      alert('Book added to favorites');
    });
  }
}
