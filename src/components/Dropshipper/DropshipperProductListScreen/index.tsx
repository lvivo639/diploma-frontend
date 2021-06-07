import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Product, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import DropshipperProductCard from '../DropshipperProductCard';

const DropshipperProductListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { supplierId } = useParams<{ supplierId: string }>();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const [productList, setProductList] = React.useState<Array<Product>>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const filterParams = new URLSearchParams({
        supplier_setting: supplierId || '',
      });

      const response: any = await dispatch(
        sendRequest('get', `/products?${filterParams}`),
      );
      setProductList(response.data || ([] as Array<Product>));
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch, supplierId]);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Box mb={4}>
        <Typography variant="h3">Supplier product list</Typography>
        <Typography>Add products to cart to create an order</Typography>
      </Box>
      {productList.length ? (
        <Grid container spacing={2} justify="flex-start">
          {productList.map((product) => (
            <Grid item>
              <DropshipperProductCard product={product} key={product.id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>Product list of this supplier is empty</>
      )}
    </>
  );
};

export default DropshipperProductListScreen;
