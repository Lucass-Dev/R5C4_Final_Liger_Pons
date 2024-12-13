import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Satisfaction } from '../../../models/Satisfaction';

@Component({
  selector: 'app-satisfaction-list',
  standalone: true,
  imports: [],
  templateUrl: './satisfaction-list.component.html',
})
export class SatisfactionListComponent {
  @Input({ required: true }) data: Satisfaction[] = [];
  @Output() onSingleModification = new EventEmitter<{ id: number; like: number }>();

  offset = 0;
  limit = 50;
  shownData: Satisfaction[] = [];

  /**
   * Cf composant UserDataComponent pour plus d'explications sur le ngOnChanges
   */
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

  // 5 - Manipulation unique
  onSingleUpdate(id: number, like: number) {
    this.onSingleModification.emit({ id, like });
  }
}
