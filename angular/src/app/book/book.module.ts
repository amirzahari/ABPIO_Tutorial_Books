import { NgModule } from '@angular/core';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // add this line

@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    BookRoutingModule,
    SharedModule,
    NgbDatepickerModule,
  ]
})

export class BookModule { }
