import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { BookService } from '../service/book.service';
import { BookDto } from '../model/BookDto';
import { Comment } from '../model/Comment';
import {NgForOf, NgIf,} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-book-single-page',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './book-single-page.component.html',
  styleUrls: ['./book-single-page.component.css']
})
export class BookSinglePageComponent implements OnInit {
  book: BookDto | undefined;
  comments: Comment[] = [];
  commentsVisible: boolean = false;
  newComment: string = '';

  constructor(private route: ActivatedRoute,
              private bookService: BookService ,
              protected auth: AuthenticationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const bookId = +idParam;
        this.bookService.getById(bookId).subscribe(
          book => {
            this.book = book;
          },
        );
      }
    });
  }

  addToFavorites(bookId: number) {
    this.bookService.addToFavorites(bookId).subscribe(() => {
      alert('Book added to favorites');
    });
  }

  toggleComments() {
    this.commentsVisible = !this.commentsVisible;
    if (this.commentsVisible && this.book) {
      this.bookService.getComments(this.book.id).subscribe(
        comments => {
          this.comments = comments;
        }
      );
    }
  }

  addComment() {
    if (this.book && this.newComment.trim()) {
      this.bookService.addComment(this.book.id, this.newComment).subscribe(
        comment => {
          this.comments.push(comment);
          this.newComment = '';
        }
      );
    }
  }
}
