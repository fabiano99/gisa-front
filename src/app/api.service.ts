import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Card } from "./card/card.model";
import { Observable, map} from "rxjs";
import { BarChart, BarChartGroup } from "./bar-chart/bar-chart.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getCards(): Observable<{cards: Card[]}> {
    return this.http.get<{cards: Card[]}>(`${this.baseUrl}/cards`);
    //mock return {
//   titulo: string,
//   valor: number,
//   melhor_mes: string,
//   periodo_anterior: number
// }

    // return new Observable((observer) => {
    //   setTimeout(() => {
    //     observer.next({
    //       cards: [
    //         {
    //           titulo: 'Total de Pedidos',
    //           valor: 100,
    //           melhor_mes: 'Fevereiro',
    //           periodo_anterior: 50
    //         },
    //         {
    //           titulo: 'Total de Pedidos',
    //           valor: 100,
    //           melhor_mes: 'Fevereiro',
    //           periodo_anterior: -50
    //         },
    //         {
    //           titulo: 'Total de Pedidos',
    //           valor: 100,
    //           melhor_mes: 'Fevereiro',
    //           periodo_anterior: 50
    //         },
    //         {
    //           titulo: 'Total de Pedidos',
    //           valor: 100,
    //           melhor_mes: 'Fevereiro',
    //           periodo_anterior: 50
    //         }
    //       ]
    //     });
    //   }, 1000);
    // });

  }

  getChartData(): Observable<BarChart[]> {
    return this.http.get<any>(`${this.baseUrl}/graficos`).pipe(map((response) => response.data));
  }

  chatPrompt(prompt: string): Observable<{response: string, grafico?: BarChartGroup[]}> {
    // return this.http.post<any>(`${this.baseUrl}/chat`, {
    //   "query": {
    //     "user_query": prompt
    //   },
    //   "db_config": {
    //     "host": "localhost",
    //     "port": 3306,
    //     "user": "user",
    //     "password": "user",
    //     "database": "Pedidos"
    //   }
    // });

    // mock return
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({
          response: 'Gráficos de vendas <br> por mês de 2023',
          grafico: [
            {
              grupo: 'Vinho tinto seco',
              dados: [
                { Eixo_x: 34, Eixo_y: 'Fevereiro' },
                { Eixo_x: 31, Eixo_y: 'Março' },
                { Eixo_x: 36, Eixo_y: 'Abril' },
                { Eixo_x: 5, Eixo_y: 'Maio' }
              ]
            },
            {
              grupo: 'Vinho tinto suave',
              dados: [
                { Eixo_x: 55, Eixo_y: 'Fevereiro' },
                { Eixo_x: 20, Eixo_y: 'Março' },
                { Eixo_x: 6, Eixo_y: 'Abril' },
                { Eixo_x: 50, Eixo_y: 'Maio' }
              ]
            },
            {
              grupo: 'Vinho branco seco',
              dados: [
                { Eixo_x: 23, Eixo_y: 'Fevereiro' },
                { Eixo_x: 12, Eixo_y: 'Março' },
                { Eixo_x: 38, Eixo_y: 'Abril' },
                { Eixo_x: 42, Eixo_y: 'Maio' }
              ]
            },
            {
              grupo: 'Vinho branco suave',
              dados: [
                { Eixo_x: 3, Eixo_y: 'Fevereiro' },
                { Eixo_x: 6, Eixo_y: 'Março' },
                { Eixo_x: 14, Eixo_y: 'Abril' },
                { Eixo_x: 15, Eixo_y: 'Maio' }
              ]
            }
          ],
        });
      }, 1000);
    });
  }

  getInsight(): Observable<{insight: string}> {
    return this.http.get<any>(`${this.baseUrl}/insights`);
    //mock return
    // return new Observable((observer) => {
    //   setTimeout(() => {
    //     observer.next({insight: 'O mês de Fevereiro foi o melhor mês de vendas, com um total de 100 pedidos. Isso representa um aumento de 50% em relação ao mês anterior.'});
    //   }, 1000);
    // });
  }
}

export interface ChatResponse {response: string, grafico?: {Eixo_x: number, Eixo_y: string}[]}
