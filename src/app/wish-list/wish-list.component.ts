import { Component, OnInit } from '@angular/core';

import { Book } from '../book.interface';
import { BooksService } from '../book.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  books!: Book[];
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.wishSubject$.subscribe((book) => {
      this.books = book;
    });
    this.booksService.getInitialwWshes();
  }

  removeFromWish(book: Book) {
    this.booksService.removeFromWishlist(book);
    this.booksService.getInitialwWshes();
  }
}
