import { Component, OnInit } from '@angular/core';
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Currencies } from '../../models/currencies.model';
import { CurrencyService } from '../../services/currency.service';
import { ExchangeComponent } from '../exchange/exchange.component';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  currencies : Currencies | undefined;
  
  faMoneyBillAlt = faMoneyBillAlt;

  constructor(private currencyService: CurrencyService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currencyService.currencies().subscribe(s => this.currencies = s, 
      () => console.log('Error')
    );
  }

  open(currency: string) {
    const modalRef = this.modalService.open(ExchangeComponent);
    modalRef.componentInstance.rate = this.currencies?.rates.find(f=> f.name === currency);
  }

}
