import { Order } from './../../../common/types';
const getPrice = (order: Order) =>
  order.productOrders.reduce((acc, cur) => acc + cur.price, 0);

export default getPrice;
