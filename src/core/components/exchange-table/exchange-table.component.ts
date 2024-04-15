import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-exchange-table',
  standalone: true,
  imports: [],
  templateUrl: './exchange-table.component.html',
  styleUrl: './exchange-table.component.scss'
})
export class ExchangeTableComponent {

  @Input() base: string = '';

  private _fullExchangeList = [];
  public exchangeList = [];
  public currentDate = new Date;
  public currentPage = 1;
  private amountPerPage = 5;

  constructor(private _api: ApiService) {
    this.autorefresh();
  }

  public getExchangeList() {
    this._fullExchangeList = this._api.getExchangeRateList(this.base);
    
  }

  public pagination(changeTo: string){
    this.currentPage = changeTo==='prev'? this.currentPage--: this.currentPage++;
    this.exchangeList = this._fullExchangeList.slice(this.currentPage*this.amountPerPage-1, this.amountPerPage);
  }

  private autorefresh() {
    const timer = timer(10000);
    timer.subscribe(()=>{
      this.getExchangeList();
    })
  }


}
