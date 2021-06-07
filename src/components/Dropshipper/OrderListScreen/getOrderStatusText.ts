import { OrderStatus } from '../../../common/types';

const getOrderStatusText = (orderStatus: OrderStatus) => {
  switch (orderStatus) {
    case 'packaging':
      return 'packaging';
    case 'sent':
      return 'sent';
    case 'received':
      return 'received';
    case 'sentBack':
      return 'sentBack';
    default:
      return 'undefined';
  }
};
export default getOrderStatusText;
