import { PizzaModel } from "./pizza-model";
import { ToppingsModel } from "./toppings-model";

export interface OrderModel {
    pizza: PizzaModel,
    toppings: ToppingsModel[]
}

