import { Routes } from '@angular/router';
import { UserPageComponent } from './user-list/page/user-page.component';
import { SatisfactionDataPageComponent } from './satisfaction-data/page/satisfaction-data-page.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UserPageComponent,
  },
  {
    path: 'satisfaction',
    component: SatisfactionDataPageComponent,
  },
];
