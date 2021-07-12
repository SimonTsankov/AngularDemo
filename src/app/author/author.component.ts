import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Author} from "../model/Author";
import {AuthorService} from "../service/author.service";


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author: Author = new Author();
  selected = new FormControl(0);
  authorState = '';
  displayColumns: string[] = ["name", "lastName", "address"]
  // @ts-ignore
  dataSource;


  constructor(private authorService: AuthorService) {
    // this.dataSource= ELEMENT_DATA;
    this.author = new Author();
  }

  ngOnInit(): void {
    this.author = new Author();
    this.refreshGrid();
  }

  refreshGrid() {
    this.authorService.getAuthors().subscribe(data => {
      this.dataSource = data;
    })
  }

  cancelUpdate() {
    this.author = new Author();
    this.selected.setValue(0);
  }

  async save() {
    if (this.author.id != null) {
      const t = await this.authorService.updateAuthor(this.author);
    } else {
      await this.authorService.createAuthor(this.author);
    }
    this.selected.setValue(0);
    this.author = new Author();
    this.refreshGrid();
  }

  setForUpdateAuthor(author: Author) {
    this.author = author;
    this.selected.setValue(1);
  }

  async delete() {
    await this.authorService.deleteAuthor(this.author.id);
    this.author = new Author();
    this.selected.setValue(0);
    this.refreshGrid();

  }
}
