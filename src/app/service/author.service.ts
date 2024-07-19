import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import {SaveAuthorDto} from "../model/SaveAuthorDto";
import {AuthorResponseDto} from "../model/AuthorResponseDto";
import {PagingResponseDto} from "../model/PagingResponseDto";
import {environment} from "../envoriment/enviroment.dev";


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = `${environment.apiUrl}/v1/authors`;

  constructor(private http: HttpClient) { }

  createAuthor(authorDto: SaveAuthorDto): Observable<AuthorResponseDto> {
    return this.http.post<AuthorResponseDto>(this.baseUrl, authorDto);
  }

  getAllAuthors(page: number, size: number, orderBy: string, order: string): Observable<PagingResponseDto> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('orderBy', orderBy)
      .set('order', order);
    return this.http.get<PagingResponseDto>(this.baseUrl, { params });
  }

  getAuthorById(id: number): Observable<AuthorResponseDto> {
    return this.http.get<AuthorResponseDto>(`${this.baseUrl}/${id}`);
  }

  updateAuthor(id: number, authorDto: SaveAuthorDto): Observable<AuthorResponseDto> {
    return this.http.put<AuthorResponseDto>(`${this.baseUrl}/${id}`, authorDto);
  }

}
