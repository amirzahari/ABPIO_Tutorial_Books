import { Component, NgModule, OnInit } from '@angular/core';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { AuthorLookupDto, BookDto, BookService, bookTypeOptions } from '@proxy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  providers: [ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ]
})

export class BookComponent implements OnInit {

  book = { items: [], totalCount: 0 } as PagedResultDto<BookDto>;
  authors$: Observable<AuthorLookupDto[]>;
  isModalOpen = false; // add this line
  form: FormGroup; // add this line
  selectedBook = {} as BookDto; // declare selectedBook
  bookTypes = bookTypeOptions;

  constructor(
    public readonly list: ListService,
    private bookService: BookService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService) {
    this.authors$ = bookService.getAuthorLookup().pipe(map((r) => r.items));
  }

  ngOnInit(): void {
    const bookStreamCreator = (query) => this.bookService.getList(query);
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.book = response;
    });
  }

  // add new method
  createBook() {
    this.selectedBook = {} as BookDto; // reset the selected book
    this.buildForm();
    this.isModalOpen = true;
  }

  // Add editBook method
  editBook(id: string) {
    this.bookService.get(id).subscribe((book) => {
      this.selectedBook = book;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  // Add a delete method
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.bookService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      authorId: [this.selectedBook.authorId || null, Validators.required],
      name: [this.selectedBook.name || '', Validators.required],
      type: [this.selectedBook.type || null, Validators.required],
      publishDate: [
        this.selectedBook.publishDate
          ? new Date(this.selectedBook.publishDate)
          : null,
        Validators.required],
      price: [this.selectedBook.price || null, Validators.required],
    });
  }

  // add save method
  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedBook.id
      ? this.bookService.update(this.selectedBook.id, this.form.value)
      : this.bookService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

}
