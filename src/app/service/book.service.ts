import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Book} from '../model/Book'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  getBookByGenreUrl = "http://localhost:8090/hello-world/api/book/getBookByGenre/?genre="
  getBookByAuthorNameUrl = "http://localhost:8090/hello-world/api/book/getBookByAuthorName/?name="
  getBookByNameUrl = "http://localhost:8090/hello-world/api/book/findByName/?name=";
  getAllBookUrl = "http://localhost:8090/hello-world/api/book/getAll";
  createBookUrl = "http://localhost:8090/hello-world/api/book/create";
  updateBookUrl = "http://localhost:8090/hello-world/api/book/update";
  deleteBookUrl = "http://localhost:8090/hello-world/api/book/delete/?id=";

  constructor(private http: HttpClient) {
  }

  async creatBook(book: Book) {
    return await this.http.post(this.createBookUrl, book, {responseType: 'text'}).toPromise();
  }

  async updateBook(book: Book) {
    return await this.http.put(this.updateBookUrl, book, {responseType: 'text'}).toPromise();
  }

  getBook() {
    return this.http.get<Book[]>(this.getAllBookUrl);
  }

  async deleteBook(id: number) {
    return await this.http.delete(this.deleteBookUrl + id, {responseType: 'text'}).toPromise();
  }

  getBooksByName(searched: string) {
    return this.http.get<Book[]>(this.getBookByNameUrl + searched);
  }


  getBookByGenre(name: string) {
    return this.http.get<Book[]>(this.getBookByGenreUrl + name);
  }

  getBookByAuthor(genre: string) {
    return this.http.get<Book[]>(this.getBookByAuthorNameUrl + genre);
  }
}
