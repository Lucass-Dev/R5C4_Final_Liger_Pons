import { Component, Input, SimpleChanges } from '@angular/core';
import { User } from '../../../models/User';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-user-data',
  standalone: true,
  templateUrl: './user-data.component.html',
  imports: [PercentPipe],
})
export class UserDataComponent {
  @Input({ required: true }) users: User[] = [];

  menRatio = 0;
  womenRatio = 0;
  totalUsers = 0;

  /**
   * On n'a pas eu le temps d'aborder les cycles de vie des composants Angular.
   * On a plutôt vu ngOnInit, qui run une fois à la création du composant.
   *
   * Mais régulièrement, on a besoin de mettre à jour le composant en fonction des nouvelles données.
   * Notre application fetch des données depuis une API, il s'agit d'une opération asynchrone.
   *
   * Ce qu'il se passe dans notre cas, c'est que le composant est créé avant même que notre API ait répondu.
   * Il existe donc une première version de ce composant où users est en effet un tableau vide car l'API n'a pas encore répondu.
   * Donc si on utilisait ngOnInit ici, on aurait jamais de données à afficher.
   *
   * Lorsque l'API répond et que user-page reçoit effectivement les données, ce composant est aussi mis à jour et est re-rendu et reçoit
   * une nouvelle version de users.
   * C'est un évènement de changement de données.
   *
   * On utilise ngOnChanges pour cela et on regarde si la propriété users a changé.
   * Si oui, alors on recalcule les ratios.
   * Si non, peu importe, ça ne concerne pas notre donnée, on ne fait rien.
   *
   * Notez que onChanges ne concerne que la donnée qui entre dans le composant, pas un changement interne
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['users']) {
      return;
    }

    const numberOfMen = this.users.filter((u) => u.imgUrl.includes('/men')).length;
    const numberOfWomen = this.users.filter((u) => u.imgUrl.includes('/women')).length;

    this.totalUsers = this.users.length;
    this.menRatio = numberOfMen / this.totalUsers;
    this.womenRatio = numberOfWomen / this.totalUsers;
  }
}
