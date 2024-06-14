import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { BarChart, BarChartGroup } from "../bar-chart/bar-chart.model";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'gisa-prompt-result-chart',
  templateUrl: './prompt-result-chart.component.html',
  styleUrl: './prompt-result-chart.component.scss'
})
export class PromptResultChartComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() data: BarChart[] = [];

  constructor(private apiService: ApiService, private sanatizer: DomSanitizer) {
    this.title = '';
    this.text = '';
    // apiService.getChartData().subscribe((data) => {
    //   console.log(data);
    //   this.data = data;
    // }, (error) => {
    //   console.log('Error:', error);

    // });
  }
  ngOnInit(): void {
    this.text = this.replaceNewLine(this.text as string);
    const html = this.sanatizer.bypassSecurityTrustHtml(this.text);
    this.text = html as string;
    if (this.checkForSQLError(this.text)) {
      this.text = 'Desculpe, houve um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.\nSe o problema persistir, entre em contato com o suporte técnico.';
    }
  }

  checkForSQLError(response: string) {
    const sqlErrorRegex = /SQL|WHERE|SELECT/gi;
    return sqlErrorRegex.test(response);
  }

  replaceNewLine(text: string) {
    return text.replaceAll(/\n/g, '<br>');
  }
}
