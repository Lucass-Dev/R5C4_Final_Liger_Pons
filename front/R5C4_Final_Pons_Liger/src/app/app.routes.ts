import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { VisualisationPageComponent } from './visualisation-page/visualisation-page.component';
import { GraphiquePageComponent } from './graphique-page/graphique-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'visualisation',
    component: VisualisationPageComponent,
  },
  {
    path: 'graphiques',
    component: GraphiquePageComponent,
  },
];
