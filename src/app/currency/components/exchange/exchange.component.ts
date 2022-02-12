import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rate } from '../../models/rate.model';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  @Input() rate: Rate | undefined;
  amount: number = 0;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  calcAmount(amount:string) {
    if(this.rate)
      this.amount = parseFloat(amount) / this.rate.value * this.rate.unit;
  }
}
