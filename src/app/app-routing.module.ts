import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProductComponent } from './components/user-product/user-product.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: "",
    component: UsersComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "user-products",
    component: UserProductComponent,
  },
  {
    path: "user-products/user/:userId",
    component: UserProductComponent
  }  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
