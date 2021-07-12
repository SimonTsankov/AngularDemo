import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Book} from '../model/Book';
import {BookService} from '../service/book.service';
import {AuthorService} from "../service/author.service";
import {Author} from "../model/Author";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  selectedAuthor?: number = 0;
  authorDataSource: any;
  //@ts-ignore
  authorId;
  //@ts-ignore
  book: Book;
  //@ts-ignore
  dataSource;
  selected = new FormControl(0);
  displayColumns: string[] = ["name", "genre", "price", "author"]
  searchedWord: any;
  columns: string[] = [ "genre", "author"];
  selectedColumnSearch: any;

  constructor(private bookService: BookService, private authorService: AuthorService) {
    this.book = new Book();
  }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe(data => {
      this.authorDataSource = data
    })
    this.book = new Book();
    this.refreshGrid();
  }


  refreshGrid() {
    this.bookService.getBook().subscribe(data => {
      this.dataSource = data;
    })
  }

  setForUpdateBook(book: Book) {
    this.book = book;
    // @ts-ignore
    this.book.author != null ? this.selectedAuthor = book.author.id : this.selectedAuthor = 0;

    this.selected.setValue(1);
    //@ts-ignore
    if (this.book.author != null)
      this.authorId = this.book.author.id;
    else {
      this.authorId = 'none'
    }

  }

  cancelUpdate() {
    this.selectedAuthor = 0;
    this.book = new Book();
    this.selected.setValue(0);
    this.authorId = null;
  }

  async delete() {
    if (this.book.id != null) {
      await this.bookService.deleteBook(this.book.id);
      this.book = new Book;
    }
    await this.refreshGrid();
    this.selected.setValue(0);
    this.selectedAuthor = 0;
  }

  async save() {

    console.log(this.selectedAuthor);
    if (this.selectedAuthor == 0) {
      //@ts-ignore
      this.book.author = null;
    } else {
      this.book.author = new Author();
      //@ts-ignore
      this.book.author.id = this.selectedAuthor;
    }

    if (this.book.id != null) {
      await this.bookService.updateBook(this.book);
    } else {
      await this.bookService.creatBook(this.book);
    }

    this.book = new Book();
    await this.refreshGrid();
    this.selected.setValue(0);
  }

  async search() {
    switch (this.selectedColumnSearch) {
      case "name":
        this.bookService.getBooksByName(this.searchedWord).subscribe(data => {
          this.dataSource = data;
        })
        break;
      case "author":
        this.bookService.getBookByAuthor(this.searchedWord).subscribe(data => {
          this.dataSource = data;
        })
        break;

      case "genre":
        console.log("here")
        this.bookService.getBookByGenre(this.searchedWord).subscribe(data => {
          this.dataSource = data;
        })
        break;
    }
    console.log(this.selectedColumnSearch)
  }
}
