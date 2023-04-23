import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @MaxLength(20)
  @MinLength(2)
  name: string;

  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  updatedAt: Date;
}
