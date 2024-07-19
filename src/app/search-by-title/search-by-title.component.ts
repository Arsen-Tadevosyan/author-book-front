import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {BookService} from '../service/book.service';
import {CommonModule} from '@angular/common';
import {BookResponseDto} from "../model/BookResponseDto";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-by-title',
  templateUrl: './search-by-title.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./search-by-title.component.css']
})
export class SearchByTitleComponent implements OnInit {
  searchControl = new FormControl('');
  books: BookResponseDto[] = [];
  page = 0;
  size = 10;
  loading = false;

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(title => {
        if (title && title.trim().length > 0) {
          this.page = 0;
          return this.bookService.searchBooksByTitle(title, this.page, this.size);
        } else {
          return of({content: []});
        }
      })
    ).subscribe(response => {
      this.books = response.content;
    });
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight && !this.loading) {
      this.page++;
      this.loading = true;
      this.bookService.searchBooksByTitle(this.searchControl.value || '', this.page, this.size)
        .subscribe(response => {
          this.books = [...this.books, ...response.content];
          this.loading = false;
        });
    }
  }

  viewBook(bookId: number) {
    this.router.navigate(['/book', bookId]);
  }
}
