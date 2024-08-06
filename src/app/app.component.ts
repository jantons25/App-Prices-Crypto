import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Coin{
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  searchCoin(){
      this.filterCoins = this.coins.filter((coin) => 
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase()) 
    );
  }

  coins: Coin[] = [];
  filterCoins: Coin[] = [];
  titles: string [] = [
    '#',
    'Moneda',
    'Precio',
    'Variación',
    'Volumen últimas 24h',
  ]

  searchText = '';

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.http
      .get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .subscribe(
          (res) => {
            console.log(res);
            this.coins = res;
            this.filterCoins = res;
        },
        (err) => console.log(err)
      );
  }

}
