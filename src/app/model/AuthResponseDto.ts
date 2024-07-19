import {UserDto} from "./UserDto";

export interface AuthResponseDto {
  token: string;
  userDto: UserDto
}
