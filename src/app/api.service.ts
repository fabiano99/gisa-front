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

  chatPrompt(prompt: string): Observable<{response: string, grafico?: BarChart[]}> {
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

    // mock return
    // return new Observable((observer) => {
    //   setTimeout(() => {
    //     observer.next({
    //       response: '"Este erro ocorreu porque você inseriu uma questão no lugar de uma instrução SQL. A pergunta \"What are the 5 products with the highest total order value?\" não é uma sintaxe SQL válida, portanto, o interpretador SQL lançou um erro.\n\nAqui está a instrução SQL correta, sem a pergunta:\n\n```sql\nSELECT Nome_produto, SUM(Valor_total) as total_order_value \nFROM pedidos_novo \nGROUP BY Nome_produto \nORDER BY total_order_value DESC \nLIMIT 5;\n```\n\nTente executar apenas essa instrução SQL e você deverá obter os resultados desejados."',
    //       grafico: [
    //             { Eixo_x: 34, Eixo_y: 'Fevereiro' },
    //             { Eixo_x: 31, Eixo_y: 'Março' },
    //             { Eixo_x: 36, Eixo_y: 'Abril' },
    //             { Eixo_x: 5, Eixo_y: 'Maio' }
    //       ],
    //     });
    //   }, 1000);
    // });
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
