import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SaveBookDto } from "../model/SaveBookDto";
import { BookDto } from "../model/BookDto";
import { BookService } from "../service/book.service";
import { AuthenticationService } from "../service/authentication.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-book-comp',
  templateUrl: './book-comp.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./book-comp.component.css']
})
export class BookCompComponent implements OnInit {
  bookForm!: FormGroup;
  books: BookDto[] | null = null;
  pagedBooks: BookDto[] = [];
  currentPage = 1;
  pageSize = 5;

  constructor(private fb: FormBuilder,
              private service: BookService,
              protected auth: AuthenticationService) {}

  ngOnInit() {
    this.initializeForm();
    this.loadBooks();
  }

  initializeForm() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      authorId: [0, Validators.required]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const book: SaveBookDto = this.bookForm.value as SaveBookDto;
      this.service.createBook(book).subscribe(response => {
        console.log('Book created successfully:', response);
        this.loadBooks();
        this.resetFormFields();
      });
    } else {
      this.validateAllFormFields(this.bookForm);
    }
  }
  resetFormFields() {
    this.bookForm.reset();
  }
  loadBooks() {
    this.service.getAllBooks().subscribe(response => {
      this.books = response;
      this.updatePagedBooks();
    });
  }

  updatePagedBooks() {
    if (this.books) {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedBooks = this.books.slice(start, end);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagedBooks();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  get totalPages() {
    return Math.ceil((this.books?.length || 0) / this.pageSize);
  }

  addToFavorites(bookId: number) {
    this.service.addToFavorites(bookId).subscribe(() => {
      alert('Book added to favorites');
    });
  }
}
