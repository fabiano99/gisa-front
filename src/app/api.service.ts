import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Card } from "./card/card.model";
import { Observable, map} from "rxjs";
import { BarChart } from "./bar-chart/bar-chart.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getCards(): Observable<{cards: Card[]}> {
    return this.http.get<{cards: Card[]}>(`${this.baseUrl}/cards`);
  }

  getChartData(): Observable<BarChart[]> {
    return this.http.get<any>(`${this.baseUrl}/graficos`).pipe(map((response) => response.data));
  }

  chatPrompt(prompt: string): Observable<{response: string}> {
    return this.http.post<any>(`${this.baseUrl}/chat`, {
      "query": {
        "user_query": prompt
      },
      "db_config": {
        "host": "localhost",
        "port": 3306,
        "user": "user",
        "password": "user",
        "database": "Pedidos"
      }
    });
  }

  getInsight(): Observable<{insight: string}> {
    return this.http.get<any>(`${this.baseUrl}/insights`);
  }
}
