import { Component, Inject, OnInit } from '@angular/core';
import { BooksService } from '../book.service';
import { Book } from '../book.interface';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  books: Book[] = [];
  lastSearch!: string;
  userName: string = '';

  constructor(
    private bookservice: BooksService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.bookservice.UserName$.subscribe((userName) => {
      this.userName = userName;
    });
    this.bookservice.getInitialUserName();
  }
  querychange() {
    this.searchBooks(this.query);
  }
  searchBooks(query: string) {
    return this.bookservice.getSearchResult(query).subscribe((data) => {
      this.lastSearch = query;
      this.books = data;
    });
  }
  openDialog(book: Book): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {
        title: book.title,
        description: book.description,
        imagePath: book.imagePath,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  goToWishPage() {
    this.router.navigate(['wish']);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  imagePath: string | undefined;
  title!: string;
  WishlistBook!: Book[];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private bookservice: BooksService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  Wishlist(data: Book): void {
    this.bookservice.addNewWishlist(data);
    this.dialogRef.close();
  }
}
