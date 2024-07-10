import {AuthorResponseDto} from "./AuthorResponseDto";

export interface BookDto {
  id: number;
  description: string;
  price: number;
  title: string;
  priceUSD: number;
  authorResponseDto: AuthorResponseDto;
}
