import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Address} from "../model/Address"
import {AddressService} from "../service/address.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  //@ts-ignore
  address: Address;
  //@ts-ignore
  dataSource;
  selected = new FormControl(0);

  displayColumns: string[] = ["country", "city", "street"]


  constructor(private addressService: AddressService) {
    this.address = new Address();
  }

  ngOnInit(): void {
    this.refreshGrid();
  }

  setForUpdateAddress(address: Address) {
    this.address = address; //address linked to input fields becomes clicked address
    this.selected.setValue(1);//goes to second tab where we save and edit

  }

  cancelUpdate() {
    this.address = new Address();
    this.selected.setValue(0)
  }

  async save() {
    if (this.address.id != null) { //if address already has id it is being update
      await this.addressService.updateAddress(this.address);
    } else await this.addressService.createAddress(this.address); //if it has no id its being created
    this.refreshGrid();
    this.selected.setValue(0);
  }
  refreshGrid(){
    this.addressService.getAdresses().subscribe(data=>{this.dataSource=data})

  }
  async delete() {
    await this.addressService.deleteAddress(this.address.id);
    this.address= new Address();
    this.selected.setValue(0);
    this.refreshGrid();
  }
}
