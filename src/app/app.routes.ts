import {Routes} from '@angular/router';
import {AuthorCompComponent} from './author-comp/author-comp.component';
import {BookCompComponent} from './book-comp/book-comp.component';
import {BookSearchComponent} from './book-search/book-search.component';
import {SearchByTitleComponent} from './search-by-title/search-by-title.component';
import {BookSinglePageComponent} from './book-single-page/book-single-page.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {UpdateAuthorComponent} from "./update-author/update-author.component";
import {ProfileComponent} from "./profile/profile.component";
import {AdminGuard} from "./guard/AdminGuard";
import {AuthGuard} from "./guard/AuthGuard";
import {LoginGuard} from "./guard/LoginGuard";
import {FavBooksComponent} from "./fav-books/fav-books.component";
import {RegisterComponent} from "./register/register.component";


export const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent ,canActivate:[LoginGuard]},
  { path: 'authors', component: AuthorCompComponent },
  { path: 'search', component: SearchByTitleComponent },
  { path: 'bookFilter', component: BookSearchComponent },
  { path: 'books', component: BookCompComponent },
  { path: 'book/:id', component: BookSinglePageComponent },
  { path: 'register', component: RegisterComponent ,canActivate:[LoginGuard] },
  { path: 'updateAuthor/:id', component: UpdateAuthorComponent, canActivate: [AdminGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'favBooks', component: FavBooksComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
