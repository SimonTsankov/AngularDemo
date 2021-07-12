import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Author} from "../model/Author";
import {AuthorService} from "../service/author.service";
import {AddressService} from "../service/address.service";
import {Address} from "../model/Address";


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
  selectedAddress?: number = 0;
  addressDataSource: any;

  constructor(private authorService: AuthorService, private addressService: AddressService) {
    // this.dataSource= ELEMENT_DATA;
    this.author = new Author();


  }

  ngOnInit(): void {
    this.addressService.getAdresses().subscribe(data => {
      this.addressDataSource = data
      console.log("done")
    })
    this.author = new Author();
    this.refreshGrid();


  }

  refreshGrid() {
    this.authorService.getAuthors().subscribe(data => {
      this.dataSource = data;
    })

  }

  cancelUpdate() {
    this.selectedAddress = 0;
    this.author = new Author();
    this.selected.setValue(0);
  }

  async save() {
    console.log(this.selectedAddress)
    if(this.selectedAddress==0){
      // @ts-ignore
      this.author.address= null;
    }else {
      this.author.address = new Address();
      // @ts-ignore
      this.author.address.id = this.selectedAddress;
    }


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
    console.log(this.addressDataSource[0].country)
    // @ts-ignore
    this.author.address!=null ? this.selectedAddress=author.address.id : this.selectedAddress = 0;
    this.author = author;
    this.selected.setValue(1);
  }

  async delete() {
    await this.authorService.deleteAuthor(this.author.id);
    this.author = new Author();
    this.selected.setValue(0);
    this.refreshGrid();
    this.selectedAddress = 0;

  }
}
