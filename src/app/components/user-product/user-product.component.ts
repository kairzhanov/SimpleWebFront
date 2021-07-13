import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserproductsService } from 'src/app/services/userproducts.service';
import { switchMap } from 'rxjs/operators';
import { UserProduct } from 'src/app/models/user-product.model';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent implements OnInit {

  userId: string = "";
  userProducts: UserProduct[] = [];

  constructor(private route: ActivatedRoute, private userProductService: UserproductsService) { }

  ngOnInit(): void {

    // this.route.paramMap.subscribe(result => {
    //   console.log(result.get('userId'));
    // })
    this.route.paramMap.pipe(switchMap((params: any) => {
      this.userId = params.get('userId') ?? "";
      console.log(params);
      return this.userProductService.getUserProducts(this.userId);
    })).subscribe(result => {
      console.log(result);
      this.userProducts = result;
    },
    error => {
      console.log(error);
    });

    // this.userProductService.getUserProducts().pipe(switchMap())


  }

}
