import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserListComponent } from '../components/user-list/user-list.component';
import { UserDataComponent } from '../components/user-data/user-data.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [UserListComponent, UserDataComponent],
  templateUrl: './user-page.component.html',
})
export class UserPageComponent implements OnInit {
  users: User[] = [];

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get<User[]>('http://localhost:5000/users').subscribe((data) => (this.users = data));
  }
}
