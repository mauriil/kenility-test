import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { Order } from '../orders/interfaces/orders.iinterface';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {}

  async getTotalSold() {
    const orders = await this.ordersService.findAll();
    let totalSold = 0;

    orders.forEach((order: Order) => {
      order.products.forEach((product) => {
        totalSold += product.price * product.quantity;
      });
    });

    return { totalSold };
  }

  async getHighestAmountOrder() {
    return await this.ordersService.finOrderWithHighestTotal();
  }
}
