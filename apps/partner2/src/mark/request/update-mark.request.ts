import { PartialType } from '@nestjs/mapped-types';
import { CreateMarkRequest } from './create-mark.request';

export class UpdateMarkRequest extends PartialType(CreateMarkRequest) {}
