import {UserType} from "./UserType";

export interface UserDto {
   id: number;
   name: string;
   surname: string;
   userType: UserType;
   imagePath: string;
}
