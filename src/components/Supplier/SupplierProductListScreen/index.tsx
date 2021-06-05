import { CircularProgress, Grid, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Product, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import SupplierProductCard from '../SupplierProductCard';

const SupplierProductListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [productList, setProductList] = React.useState<Array<Product>>([]);

  const [loading, setLoading] = React.useState(false);

  const { currentUser } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const filterParams = new URLSearchParams({
        supplier_setting: currentUser?.supplier_setting?.id?.toString() || '',
      });

      const response: any = await dispatch(
        sendRequest('get', `/products?${filterParams}`),
      );
      setProductList(response.data as Array<Product>);
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch]);

  const onRemove = async (id: number) => {
    setLoading(true);
    await dispatch(sendRequest('delete', `/products/${id}`));

    const filterParams = new URLSearchParams({
      supplier_setting: currentUser?.supplier_setting?.id?.toString() || '',
    });

    const response: any = await dispatch(
      sendRequest('get', `/products?${filterParams}`),
    );
    setProductList(response.data as Array<Product>);

    setLoading(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <IconButton onClick={() => history.push('/products/add')}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Grid container spacing={2} justify="center">
        {productList.map((product) => (
          <Grid item>
            <SupplierProductCard
              product={product}
              key={product.id}
              onRemove={onRemove}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SupplierProductListScreen;
