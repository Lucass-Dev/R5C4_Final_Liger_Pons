import { Component, Input} from '@angular/core';
import { NumberCardModule, BarChartModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { Search } from '../models/Search';

type SingleData = {
  value: number;
  name: string;
}[];

function toSingleData(data: Record<string, number>): SingleData {
  return Object.entries(data).map(([name, value]) => ({ name, value }));
}


@Component({
  selector: 'app-graphique-page',
  standalone: true,
  imports: [NumberCardModule, BarChartModule],
  templateUrl: './graphique-page.component.html',
  styleUrl: './graphique-page.component.sass'
})
export class GraphiquePageComponent {
  data: Search[] = []; 
  
  carte2: SingleData = [];
  Bar : SingleData = [];

  view:[number, number]  = [700, 400];

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get<Search[]>('http://localhost:5000/searches/list').subscribe((data) => {
      this.data = data;
      this.carte2 = this.step1();
      this.Bar = this.step2();
    });
    
  }

  step1() {
    console.log(this.data)
    const NbDFS = this.data.filter(e => e.algorithm === "DFS").length;
    const NbBFS = this.data.filter(e => e.algorithm === "BFS").length;
    const NbDjikstra = this.data.filter(e => e.algorithm === "Djikstra").length;
    const NbA = this.data.filter(e => e.algorithm === "A*").length;

    return toSingleData({
      "DFS": NbDFS,
      "BFS": NbBFS,
      "Djikstra": NbDjikstra,
      "A*": NbA,
    })
  }

  step2(){
    const DFS = this.data.filter(e => e.algorithm === "DFS");
    const BFS = this.data.filter(e => e.algorithm === "BFS");
    const Djikstra = this.data.filter(e => e.algorithm === "Djikstra");
    const A = this.data.filter(e => e.algorithm === "A*");

    const nbDFS = DFS.length;
    const nbBFS = BFS.length;
    const nbDji = Djikstra.length;
    const nbA = A.length;

    const moyDFS = DFS.reduce((acc, curr) => acc + curr.time_ns, 0) / nbDFS;
    const moyBFS = BFS.reduce((acc, curr) => acc + curr.time_ns, 0) / nbBFS;
    const moyDji = Djikstra.reduce((acc, curr) => acc + curr.time_ns, 0) / nbDji;
    const moyA = A.reduce((acc, curr) => acc + curr.time_ns, 0) / nbA;

    return toSingleData({
      "DFS": moyDFS,
      "BFS":moyBFS,
      "Djikstra":moyDji,
      "A*": moyA,
    })
  }



}
