import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Input({ required: true }) users: User[] = [];
}
