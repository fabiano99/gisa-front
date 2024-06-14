export interface BarChart {
  Eixo_x: number;
  Eixo_y: string;
}

// {
//   grupo: 'Vinho tinto seco',
//   dados: [
//     { Eixo_x: 0.34950000000000003, Eixo_y: 'Fevereiro' },
//     { Eixo_x: 0.3635, Eixo_y: 'Março' },
//     { Eixo_x: 0.3688, Eixo_y: 'Abril' },
//     { Eixo_x: 0.0547, Eixo_y: 'Maio' }
//   ]
// }


export interface BarChartGroup {
  grupo: string;
  dados: BarChart[];
}