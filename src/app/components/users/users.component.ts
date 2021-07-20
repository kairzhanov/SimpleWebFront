import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  private getUsers$: Subscription = new Subscription();
  private deleteUser$: Subscription = new Subscription();
  private updateUser$: Subscription = new Subscription();
  private createUser$: Subscription = new Subscription();
  
  public userForm:any;
  public showForm: boolean = false;
  public isEdit: boolean = false;
  public currentUserId: number = 0;

  constructor(private userService: UsersService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
  
    this.GetAllUsers();
  }

  private GetAllUsers() {
    this.getUsers$ = this.userService.getAllUsers().subscribe(result => {
      console.log(result);

      this.users = result;
    });
  }

  public NavigateToUserProducts(userId: number) {
    this.router.navigateByUrl(`/user-product/user/${userId}`);
  }

  public SaveUser() {
    let name = this.userForm.get('name').value;
    let phone = this.userForm.get('phone').value;
    
    if (name === '' || phone === '') {
      alert("Please, check the form");
      return;
    }

    let user = new User();
    user.name = name;
    user.phone = phone;
    
    if (this.isEdit) {
      user.userId = this.currentUserId;
      this.updateUser$ =  this.userService.UpdateUser(user).subscribe(result => {
        console.log(result);
        let index = this.users.findIndex(u => u.userId == this.currentUserId);
        this.users[index] = user;
        this.HideForm();
      }, error => {
        console.log(error);
        alert('Something went wrong!')
      });
    } else {
      this.createUser$ = this.userService.CreateUser(user).subscribe(result => {
        console.log(result);
        this.users.push(result);
        this.HideForm();
      }, error => {
        console.log(error);
        alert('Something went wrong!')
      })
    }
  }

  private HideForm() {
    this.userForm.reset();
    this.isEdit = false;
    this.showForm = false;
  }

  public ShowEditUser(user: User) {
    this.showForm = true;
    this.isEdit = true;
    this.currentUserId = user.userId;

    this.userForm.patchValue({
      name: user.name,
      phone: user.phone,
      isDeleted: user.isDeleted,
    });
  }

  public ShowAddUser() {
    this.showForm = true;
    this.isEdit = false;
  }

  public DeleteUser(userId: number) {
    if (!confirm("Are you sure?")) {
      return;
    }

    this.deleteUser$ = this.userService.DeleteUser(userId).subscribe(result => {
      console.log(result);
      let index = this.users.findIndex(u => u.userId == userId);
      let user = this.users[index];
      user.isDeleted = true;
      this.users[index] = user;
      // this.users.splice(this.users.findIndex(u => u.userId === userId), 1);
    }, error => {
      alert(error);
    });
  }

  ngOnDestroy() {
    if (this.getUsers$) {
      this.getUsers$.unsubscribe();
    }

    if (this.deleteUser$) {
      this.deleteUser$.unsubscribe();
    }

    if (this.updateUser$) {
      this.updateUser$.unsubscribe();
    }

    if (this.createUser$) {
      this.createUser$.unsubscribe();
    }
  }

}
