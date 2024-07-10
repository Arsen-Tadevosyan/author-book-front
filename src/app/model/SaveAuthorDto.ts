import {Gender} from "./Gender";

export interface SaveAuthorDto {
  name: string;
  surname: string;
  gender: Gender;
  age: number;
}
