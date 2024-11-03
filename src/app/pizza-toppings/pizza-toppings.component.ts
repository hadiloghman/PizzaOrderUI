import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog'
import { MatListOption, MatSelectionList, MatListModule } from '@angular/material/list'
import { ToppingsModel } from '../toppings-model';
import { CommonModule } from '@angular/common'
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

@Component({
  selector: 'app-pizza-toppings',
  standalone: true,
  imports: [MatListOption, MatSelectionList, MatDialogContent, MatDialogActions, FormsModule, CommonModule, MatListModule],
  templateUrl: './pizza-toppings.component.html',
  styleUrl: './pizza-toppings.component.scss'
})
export class PizzaToppingsComponent {
  toppingsVeg: ToppingsModel[] = [
    { name: "Tomatoes", price: 1.00, category: "VegOptions", image: "tomatoe" },
    { name: "Onions", price: 0.50, category: "VegOptions", image: "onion" },
    { name: "Bell pepper", price: 1.00, category: "VegOptions", image: "pepper" },
    { name: "Mushrooms", price: 1.20, category: "VegOptions", image: "mushroom" },
    { name: "Pineapple", price: 0.75, category: "VegOptions", image: "pineapple" }
  ];

  toppingsNonVeg: ToppingsModel[] = [
    { name: "Sausage", price: 1.00, category: "NonVegOptions", image: "sausage" },
    { name: "Pepperoni", price: 2.00, category: "NonVegOptions", image: "pepperoni" },
    { name: "Barbecue chicken", price: 3.00, category: "NonVegOptions", image: "chicken" }
  ]
  toppingsSelectedVeg: string[] = [];
  toppingsSelectedNonVeg: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<PizzaToppingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  okClick(): void {
    const unionArray2 = [
      ...this.toppingsVeg.filter(o => this.toppingsSelectedVeg.includes(o.name)),
      ...this.toppingsNonVeg.filter(o => this.toppingsSelectedNonVeg.includes(o.name))
    ];
    console.log(unionArray2);
    this.dialogRef.close(unionArray2);

  }

  listSelectionChnages(item: any): void {
    console.log(item);
  }
}
