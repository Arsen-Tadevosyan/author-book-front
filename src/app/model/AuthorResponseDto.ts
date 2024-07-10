import {Gender} from "./Gender";

export interface AuthorResponseDto {
  id: number;
  name: string;
  surname: string;
  gender: Gender;
  age: number;
}
