import { PartialType } from '@nestjs/mapped-types';
import { CreateMatterRequest } from './create-matter.request';

export class UpdateMatterRequest extends PartialType(CreateMatterRequest) {}
