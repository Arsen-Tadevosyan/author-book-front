import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaveBookDto } from '../model/SaveBookDto';
import { BookResponseDto } from '../model/BookResponseDto';
import { BookDto } from '../model/BookDto';
import { BookFilterDto } from '../model/BookFilterDto';
import { environment } from '../envoriment/enviroment.dev';
import { Comment } from '../model/Comment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = `${environment.apiUrl}/v1/books`;

  constructor(private http: HttpClient) { }

  filterBooks(bookFilterDto: BookFilterDto, page: number, size: number): Observable<{ content: BookDto[], totalPages: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.post<{ content: BookDto[], totalPages: number }>(`${this.baseUrl}/filter`, bookFilterDto, { params });
  }

  searchBooksByTitle(title: string, page: number, size: number): Observable<{ content: BookResponseDto[] }> {
    const params = new HttpParams()
      .set('title', title)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<{ content: BookResponseDto[] }>(`${this.baseUrl}/search`, { params });
  }

  createBook(bookDto: SaveBookDto): Observable<BookDto> {
    return this.http.post<BookDto>(this.baseUrl, bookDto);
  }

  getAllBooks(): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<BookDto> {
    return this.http.get<BookDto>(`${this.baseUrl}/${id}`);
  }

  addToFavorites(bookId: number): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/favBook/${bookId}`, {});
  }

  getMyFavoriteBooks(): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(`${this.baseUrl}/myFavBooks`);
  }

  deleteFavoriteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/favBook/${bookId}`);
  }

  getComments(bookId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/viewComments/${bookId}`);
  }

  addComment(bookId: number, content: string): Observable<Comment> {
    const params = new HttpParams().set('comment', content);
    return this.http.get<Comment>(`${this.baseUrl}/comment/${bookId}`, { params });
  }
}
