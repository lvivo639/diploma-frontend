import { OrderStatus } from '../../../common/types';

const getOrderStatusText = (orderStatus: OrderStatus) => {
  switch (orderStatus) {
    case 'packaging':
      return 'Packaging';
    case 'sent':
      return 'Sent';
    case 'received':
      return 'Received';
    case 'sentBack':
      return 'Sent back';
    default:
      return 'Undefined';
  }
};
export default getOrderStatusText;
