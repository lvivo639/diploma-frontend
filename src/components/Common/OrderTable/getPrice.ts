import { ProductOrder } from '../../../common/types';
const getPrice = (product_orders: Array<ProductOrder>) =>
  product_orders.reduce((acc, cur) => acc + cur.count * cur.price, 0) ||
  'Undefined';

export default getPrice;
