import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Satisfaction } from '../../../models/Satisfaction';

@Component({
  selector: 'app-satisfaction-data-global',
  standalone: true,
  imports: [],
  templateUrl: './satisfaction-data.component.html',
})
export class SatisfactionDataComponent {
  @Input({ required: true }) data: Satisfaction[] = [];
  @Output() onAllLikes = new EventEmitter<void>();
  @Output() onPropagandaMitigation = new EventEmitter<void>();

  numberOfLikes = 0;
  numberOfDislikes = 0;

  /**
   * Cf composant UserDataComponent pour plus d'explications sur le ngOnChanges
   */
  ngOnChanges() {
    this.numberOfLikes = this.data.filter((s) => s.like).length;
    this.numberOfDislikes = this.data.filter((s) => !s.like).length;
  }

  // 3 -- Manipulation des données
  updateAllLikes() {
    this.onAllLikes.emit();
  }

  // 4 -- Observateurs extérieurs
  updatePropagandaMitigation() {
    this.onPropagandaMitigation.emit();
  }
}
