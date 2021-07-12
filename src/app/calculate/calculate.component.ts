import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']

})


export class CalculateComponent implements OnInit {

  // @ts-ignore
  @Input() labelName: string;
  // @ts-ignore
  num1 : number
  // @ts-ignore
  num2 : number
    //@ts-ignore
  result: number
  constructor() {
  }

  calculate(){
    this.result= this.num1*this.num2
  }
  ngOnInit(): void {
  }


  value = 'Clear me';
}
