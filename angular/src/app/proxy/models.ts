import type { AuditedEntityDto, EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { BookType } from './book-type.enum';

export interface AuthorDto extends EntityDto<string> {
  name?: string;
  birthDate?: string;
  shortBio?: string;
}

export interface AuthorLookupDto extends EntityDto<string> {
  name?: string;
}

export interface BookDto extends AuditedEntityDto<string> {
  authorId?: string;
  authorName?: string;
  name?: string;
  type: BookType;
  publishDate?: string;
  price: number;
}

export interface CreateAuthorDto {
  name: string;
  birthDate: string;
  shortBio?: string;
}

export interface CreateUpdateBookDto {
  name: string;
  type: BookType;
  publishDate: string;
  price: number;
  authorId?: string;
}

export interface GetAuthorListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface UpdateAuthorDto {
  name: string;
  birthDate: string;
  shortBio?: string;
}
