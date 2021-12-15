import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../book.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  constructor(private router: Router, private booksService: BooksService) {}

  ngOnInit(): void {
    localStorage.removeItem('username');
  }

  login() {
    const getUserName = this.loginForm.value.username;
    this.booksService.adduserName(getUserName);
    this.router.navigate(['search']);
  }
}
