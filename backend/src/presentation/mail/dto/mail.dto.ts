import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MailDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsNotEmpty()
  @IsString()
  public name: string
}
