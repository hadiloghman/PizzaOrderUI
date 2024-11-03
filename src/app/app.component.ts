import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDialog } from '@angular/material/dialog'
import { PizzaToppingsComponent } from './pizza-toppings/pizza-toppings.component';
import { PizzaModel } from './pizza-model';
import { OfferModel } from './offer-model';
import { OrderModel } from './order-model';
import { ToppingsModel } from './toppings-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatButton, MatIcon, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor(public dialog: MatDialog) {

  }
  order: OrderModel[] = [];

  pizzas: PizzaModel[] = [
    {
      size: 1,
      title: "Small Size",
      price: 5,
      hint: "Kid size",
      icon: "../assets/images/pizza.png",
      image: "../assets/images/pizza.png",
      description: `A small-sized pizza is perfect for individuals or light appetites, 
      typically measuring around 8-10 inches. It features a delicious, crispy crust with just the right 
      amount of everything, and your choice of fresh toppings, making it an ideal choice for a personal meal or a cozy snack`
    },
    {
      size: 2,
      title: "Medium Size",
      price: 7,
      hint: "Normal size",
      icon: "../assets/images/pizza.png",
      image: "../assets/images/pizza.png",
      description: `A medium-sized pizza offers a satisfying meal for two or a hearty option for one with
       a bigger appetite. Measuring around 12 inches, it delivers a delicious balance of crispy crust, 
       flavorful sauce, and generous cheese with plenty of room for your favorite toppings. 
       Perfect for sharing or enjoying solo with leftovers!`
    },
    {
      size: 3,
      title: "Large Size",
      price: 8,
      hint: "Large size",
      icon: "../assets/images/pizza.png",
      image: "../assets/images/pizza.png",
      description: `A large-sized pizza is ideal for group gatherings, family meals, or anyone craving 
      extra servings. Typically around 14-16 inches, it’s loaded with a crispy crust, rich sauce, 
      and gooey cheese, providing plenty of space for a variety of toppings. Perfect for sharing or enjoying 
      with leftovers to spare!`
    },
    {
      size: 4,
      title: "Extra Large Size",
      price: 9,
      hint: "Family size",
      icon: "../assets/images/pizza.png",
      image: "../assets/images/pizza.png",
      description: `An extra-large pizza is perfect for parties, big families, or anyone with a serious appetite. 
      Measuring around 18 inches or more, it’s packed with a generous crust, plenty of sauce, and an 
      abundance of melted cheese with room for all your favorite toppings. Ideal for sharing among a 
      group or saving some slices for later!`
    }

  ];

  pizzaOffers: OfferModel[] = [
    {
      title: "First Offer",
      pizzaSize: 2,
      toppingCount: 2,
      discount: 5,
      discountType: "amount",
      description: "1 Medium Pizza with 2 toppings",

      cssClass: "bg-primary"
    },
    {
      title: "Offer Economy",
      pizzaSize: 2,
      toppingCount: 4,
      discount: 9,
      discountType: "amount",
      description: "2 Medium Pizza with 4 toppings",
      cssClass: "bg-primary"
    },
    {
      title: "Best offer",
      pizzaSize: 3,
      toppingCount: 4,
      discount: 50,
      discountType: "percent",
      description: "1 Large pizza with 4 toppings (Peperoni and Barbecue chicken are counted as 2 toppings)",
      cssClass: "bg-success"
    },
  ]
  title = 'PizzaOrderUI';
  openToppingsDialog(pizzaSize: number): void {

    const dialogRef = this.dialog.open(PizzaToppingsComponent,
      {
        width: '400px',
        data: { toppingsSelected: [] }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var selectedPizza = this.pizzas.filter(o => o.size == pizzaSize);
        if (selectedPizza) {
          this.order.push({ pizza: selectedPizza[0], toppings: result });
          console.log(this.order);
        }
      }
    })
  }
  joinToppingNames(toppings: ToppingsModel[]): string {
    return toppings.map(o => o.name).join(', ');
  }
  getOrderItemPrice(order: OrderModel): number {
    return order.pizza?.price + order.toppings.reduce((sum, top) => (sum + top.price), 0);
  }
  deleteAnOrderItem(index: number): void {
    this.order.splice(index, 1);
  }

  getTotalPrice(): number {
    return this.order.reduce((sum, o) => (
      sum
      + o.pizza.price
      + o.toppings.reduce((sumTop, top) => (sumTop + top.price), 0)
    ), 0);
  }

  getTotalDiscount(): number {
    return this.order.reduce((sum, item) => (sum + this.getOrderItemDiscount(item)[0]), 0);
  }

  getTotalNetPrice(): number {
    return this.getTotalPrice() - this.getTotalDiscount();
  }

  getOrderItemDiscount(orderItem: OrderModel): [number, string] {
    let offerOption: OfferModel;
    let minDiscount = Number.MAX_SAFE_INTEGER;
    let discount = 0;
    let offerName = ""
    for (let j = 0; j <= this.pizzaOffers.length - 1; j++) {
      offerOption = this.pizzaOffers[j];
      if (offerOption.pizzaSize == orderItem.pizza.size
        && offerOption.toppingCount == orderItem.toppings.length) {
        discount = offerOption.discountType == "percent" ?
          (this.getOrderItemPrice(orderItem) * (offerOption.discount) / 100)
          : offerOption.discount;
        if (discount < minDiscount) {
          minDiscount = discount;
          offerName = offerOption.title;
        }
      }
    }
    if (minDiscount == Number.MAX_SAFE_INTEGER)
      minDiscount = 0;
    return [minDiscount, offerName];
  }

  getOrderItemNetPrice(orderItem: OrderModel): number {
    return this.getOrderItemPrice(orderItem) - this.getOrderItemDiscount(orderItem)[0];
  }

}

