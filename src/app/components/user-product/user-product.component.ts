import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserproductsService } from 'src/app/services/userproducts.service';
import { switchMap } from 'rxjs/operators';
import { UserProduct } from 'src/app/models/user-product.model';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent implements OnInit, OnDestroy {

  userId: string = "";
  userProducts: UserProduct[] = [];
  userProduct$: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private userProductService: UserproductsService) { }

  ngOnInit(): void {

    this.userProduct$ = this.route.paramMap.pipe(switchMap((params: any) => {
      this.userId = params.get('userId') ?? "";
      // console.log(params);
      return this.userProductService.getUserProducts(this.userId);
    })).subscribe(result => {
      // console.log(result);
      this.userProducts = result;
    },
    error => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    if (this.userProduct$) {
      this.userProduct$.unsubscribe();
    }
  }

}
