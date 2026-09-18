import { PartialType } from '@nestjs/mapped-types';
import { AdministratorCreateDto } from './administrator-create.dto.js';

export class AdministratorUpdateDto extends PartialType(AdministratorCreateDto) { }
