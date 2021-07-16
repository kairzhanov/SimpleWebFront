import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  private getUsers$: Subscription = new Subscription();

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  private GetAllUsers() {
    this.getUsers$ = this.userService.getAllUsers().subscribe(result => {
      this.users = result;
    });
  }

  public NavigateToUserProducts(userId: number) {
    this.router.navigateByUrl(`/user-product/user/${userId}`);
  }

  ngOnDestroy() {
    if (this.getUsers$) {
      this.getUsers$.unsubscribe();
    }
  }

}
