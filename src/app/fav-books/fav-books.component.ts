import { Component, OnInit } from '@angular/core';
import { BookDto } from '../model/BookDto';
import {BookService} from "../service/book.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-fav-books',
  templateUrl: './fav-books.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./fav-books.component.css']
})
export class FavBooksComponent implements OnInit {
  favoriteBooks: BookDto[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadFavoriteBooks();
  }

  loadFavoriteBooks(): void {
    this.bookService.getMyFavoriteBooks().subscribe(
      (books: BookDto[]) => {
        this.favoriteBooks = books;
        console.log(books);
      },
      (error) => {
        console.error('Error loading favorite books:', error);
      }
    );
  }
  deleteFavoriteBook(bookId: number): void {
    this.bookService.deleteFavoriteBook(bookId).subscribe(
      () => {
        this.favoriteBooks = this.favoriteBooks.filter(book => book.id !== bookId);
      },
      (error) => {
        console.error('Error deleting favorite book:', error);
      }
    );
  }
}
