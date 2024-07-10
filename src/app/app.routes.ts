import { Routes } from '@angular/router';
import { AuthorCompComponent } from './author-comp/author-comp.component';
import { BookCompComponent } from './book-comp/book-comp.component';
import {BookSearchComponent} from "./book-search/book-search.component";
import {SearchByTitleComponent} from "./search-by-title/search-by-title.component";
import {BookSinglePageComponent} from "./book-single-page/book-single-page.component";

export const routes: Routes = [
  { path: 'authors', component: AuthorCompComponent },
  { path: 'search', component: SearchByTitleComponent },
  { path: 'bookFilter', component: BookSearchComponent },
  { path: 'books', component: BookCompComponent },
  { path: 'book/:id', component: BookSinglePageComponent },
  { path: '', redirectTo: '/authors', pathMatch: 'full' }
];
