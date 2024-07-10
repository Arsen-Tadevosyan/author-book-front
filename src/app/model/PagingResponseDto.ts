import {AuthorResponseDto} from "./AuthorResponseDto";

export interface PagingResponseDto {
  data: AuthorResponseDto[];
  size: number;
  page: number;
  totalElements: number;
}
