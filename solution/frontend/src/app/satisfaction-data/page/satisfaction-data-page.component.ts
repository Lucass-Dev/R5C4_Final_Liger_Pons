import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Satisfaction } from '../../models/Satisfaction';
import { SatisfactionDataComponent } from '../components/satisfaction-data/satisfaction-data.component';
import { SatisfactionListComponent } from '../components/satisfaction-list/satisfaction-list.component';

@Component({
  selector: 'app-satisfaction-data',
  standalone: true,
  imports: [SatisfactionDataComponent, SatisfactionListComponent],
  templateUrl: './satisfaction-data-page.component.html',
})
export class SatisfactionDataPageComponent {
  data: Satisfaction[] = [];

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get<Satisfaction[]>('http://localhost:5000/satisfaction').subscribe((data) => {
      this.data = data;
    });
  }

  // 3 - Manipulation des données
  everyoneLikesIt() {
    this.data = this.data.map((s) => this.formatSingleData(s, 1));
  }

  // 4 - Observateurs extérieurs
  mitigatePropaganda() {
    this.data = this.data.map((s) => {
      const newLike = Math.round(Math.random());
      return this.formatSingleData(s, newLike);
    });
  }

  // 5 - Manipulation unique
  // On est obligé de mapper l'entièreté du tableau pour ne pas casser la détection de changement
  // si on faisait une simple modification indexée this.data[id] = {...} , Angular ne détecterait pas le changement
  // et les données ne seraient pas reparcourues
  updateSingleSatisfaction({ id, like }: { id: number; like: number }) {
    this.data = this.data.map((s, index) => {
      if (index !== id) {
        return s;
      }

      return this.formatSingleData(s, like);
    });
  }

  // Toutes nos actions visent à modifier les données d'un ou plusieurs likes
  // l'idée est donc de factoriser le code de modification d'une donnée
  private formatSingleData(s: Satisfaction, like: number) {
    return {
      ...s,
      like,
      // Il faut comprendre qu'en JS, si une valeur vaut 0 alors elle est fausse, sinon elle est vraie, on peut donc traiter un nombre comme un booléen
      motif: like ? "J'adore cette app ! Elle est superbe !" : "Je n'aime pas cette app ! Elle est nulle !",
    };
  }
}
