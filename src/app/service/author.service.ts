import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Author} from "../model/Author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  deleteByIdUrl= 'http://localhost:8090/hello-world/api/author/deleteById/?id='
  getAllAuthorsUrl = 'http://localhost:8090/hello-world/api/author/getAll';
  createAuthorUrl = 'http://localhost:8090/hello-world/api/author/create';
  UpdateAuthorUrl = 'http://localhost:8090/hello-world/api/author/update';
  constructor(private http: HttpClient) {
  }

  async createAuthor(author:Author){
    return await this.http.post(this.createAuthorUrl, author, {responseType:'text'}).toPromise();
  }

  async updateAuthor(author:Author){
    return await this.http.put(this.UpdateAuthorUrl,author,{responseType:'text'}).toPromise();
  }

  getAuthors(){
    return this.http.get<Author[]>(this.getAllAuthorsUrl);
  }

  async  deleteAuthor(id: number){
    return await this.http.delete(this.deleteByIdUrl+id,{responseType:'text'}).toPromise();
  }
}
