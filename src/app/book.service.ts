import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book.interface';

let Wishlist: Book[] = [];
let adduserName: string;

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url = 'https://www.googleapis.com/books/v1/volumes';
  wishSubject$ = new Subject<Book[]>();
  UserName$ = new Subject<any>();

  constructor(private http: HttpClient) {}

  hasUserName() {
    return !!adduserName;
  }

  getSearchResult(name: string): Observable<Book[]> {
    const params = new HttpParams().set('q', name).append('maxResults', 20);
    return this.http.get(this.url, { params }).pipe(
      map((res: any) =>
        Object.values(res['items'] ?? {}).map((item: any) => {
          const bookInfo = item.volumeInfo ?? {};
          return {
            title: bookInfo.title,
            imagePath:
              bookInfo.imageLinks?.thumbnail ?? '../../assets/books.jpg',
            description: bookInfo.description ?? '',
          } as Book;
        })
      )
    );
  }
  addNewWishlist(book: Book) {
    Wishlist = [...Wishlist.filter((b) => b.title !== book.title), book];
  }
  removeFromWishlist(book: Book) {
    Wishlist = [...Wishlist.filter((b) => b.title !== book.title)];
  }
  adduserName(userName: string) {
    adduserName = userName;
  }

  getInitialUserName(): void {
    this.UserName$.next(adduserName);
  }

  getInitialwWshes(): void {
    this.wishSubject$.next(Wishlist);
  }
}
