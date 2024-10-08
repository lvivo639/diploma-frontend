import { Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Product, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import BasicPaper from '../../Unknown/BasicPaper';
import errorToString from './../../../common/errorToString';
import ProductCard from './../../Common/ProductCard/index';
import InfoSnackbar from './../../Unknown/InfoSnackbar/index';

const DropshipperProductListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { supplierId } = useParams<{ supplierId: string }>();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const [productList, setProductList] = React.useState<Array<Product>>([]);
  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      setSnackbarText('');
      try {
        setLoading(true);
        const response: any = await dispatch(
          sendRequest('get', `/products`, null, {
            supplier_setting: supplierId || '',
          }),
        );
        setProductList(response.data || ([] as Array<Product>));
      } catch (e) {
        setSnackbarText(errorToString(e));
      }
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch, supplierId]);

  const handleAddToCart = (product_id: number) => async () => {
    setSnackbarText('');
    try {
      await dispatch(
        sendRequest('post', `/carts/addToCart`, null, {
          supplier_setting_id: supplierId,
          dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
          product_id,
        }),
      );
      setSnackbarText('Added');
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
  };

  return (
    <BasicPaper
      title="Supplier product list"
      subtitle="Add products to cart to create an order"
      loading={loading}
    >
      {productList.length ? (
        <Grid container spacing={2} justify="flex-start">
          {productList.map((product) => (
            <Grid item key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart(product.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>Product list of this supplier is empty</>
      )}
      <InfoSnackbar text={snackbarText} setText={setSnackbarText} />
    </BasicPaper>
  );
};

export default DropshipperProductListScreen;
