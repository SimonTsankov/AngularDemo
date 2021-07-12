import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {async} from "@angular/core/testing";
import {Address} from "../model/Address"
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  deleteByIdUrl= 'http://localhost:8090/hello-world/api/address/deleteById/?id='
  getAllAdressUrl = 'http://localhost:8090/hello-world/api/address/getAll';
  createAdressUrl = 'http://localhost:8090/hello-world/api/address/create';
  updateAdressUrl = 'http://localhost:8090/hello-world/api/address/update';
  constructor(private http: HttpClient) {
  }
  async createAddress(address: Address){
  return await this.http.post(this.createAdressUrl,address,{responseType:'text'}).toPromise();
  }
  async  updateAddress(address:Address){
    return await  this.http.put(this.updateAdressUrl, address,{responseType:'text'}).toPromise();
  }
  getAdresses(){
    return this.http.get<Address[]>(this.getAllAdressUrl);
  }
  async  deleteAddress(id:number | undefined){
    return await  this.http.delete(this.deleteByIdUrl+id,{responseType:'text'}).toPromise();
  }
}
