import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMarkRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}
