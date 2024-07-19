import { UserDto } from './UserDto';
import { BookDto } from './BookDto';

export interface Comment {
  id: number;
  content: string;
  book: BookDto;
  user: UserDto;
}
