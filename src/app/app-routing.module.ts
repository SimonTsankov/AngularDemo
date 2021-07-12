import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Author} from "./model/Author";
import {AuthorComponent} from "./author/author.component";
import {BookComponent} from "./book/book.component";
import {AddressComponent} from "./address/address.component";

const routes: Routes = [
  {
    path: 'author',
    component:AuthorComponent
  },
  {
    path: 'address',
    component:AddressComponent
  },
  {
    path:'book',
    component:BookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routeComponents = [
  AuthorComponent,
  BookComponent,
  AddressComponent
];
