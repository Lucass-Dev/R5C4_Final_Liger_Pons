import { Component, EventEmitter, Output } from '@angular/core';
import { Search } from '../models/Search';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-visualisation-page',
  standalone: true,
  imports: [],
  templateUrl: './visualisation-page.component.html',
  styleUrl: './visualisation-page.component.sass'
})
export class VisualisationPageComponent {
  data: Search[] = [];
  shownData: Search[] = [];
  offset = 0;
  limit = 30;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get<Search[]>('http://localhost:5000/searches/list?limit=5&offset=22').subscribe((data) => {
      this.data = data;
      this.updateList();
    });
    
  }
  
  ngOnChanges() {
    this.updateList();
  }

  canGoNext() {
    return this.offset + this.limit < this.data.length;
  }

  canGoPrevious() {
    return this.offset > 0;
  }

  onNext() {
    this.offset += this.limit;
    this.updateList(); // Comme on changes ne se déclenche pas sur les changements internes, on doit appeler updateList manuellement
  }

  onPrevious() {
    this.offset = Math.max(0, this.offset - this.limit);
    this.updateList(); // Comme on changes ne se déclenche pas sur les changements internes, on doit appeler updateList manuellement
  }

  updateList() {
    this.shownData = this.data.slice(this.offset, this.offset + this.limit);
  }
}