import { Box, Grid, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Product, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import ProductCard from '../../Common/ProductCard';
import BasicPaper from '../../Unknown/BasicPaper';

const SupplierProductListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [productList, setProductList] = React.useState<Array<Product>>([]);

  const [loading, setLoading] = React.useState(false);

  const { currentUser } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response: any = await dispatch(
        sendRequest('get', `/products`, null, {
          supplier_setting: currentUser?.supplier_setting?.id || '',
        }),
      );
      setProductList(response.data as Array<Product>);
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch]);

  const handleEdit = (id: number) => async () => {
    history.push(`/products/${id}`);
  };

  const handleRemove = (id: number) => async () => {
    setLoading(true);
    await dispatch(sendRequest('delete', `/products/${id}`));

    const response: any = await dispatch(
      sendRequest('get', `/products`, null, {
        supplier_setting: currentUser?.supplier_setting?.id || '',
      }),
    );
    setProductList(response.data as Array<Product>);

    setLoading(false);
  };

  return (
    <BasicPaper
      title="Your products"
      subtitle=" You can change existing or create new one clicked on add button"
      loading={loading}
    >
      <Box>
        <IconButton onClick={() => history.push('/products/add')}>
          <AddCircleOutlineIcon color="secondary" />
        </IconButton>
      </Box>
      <Grid container spacing={2} justify="flex-start">
        {productList.map((product) => (
          <Grid item key={product.id}>
            <ProductCard
              product={product}
              onRemove={handleRemove(product.id)}
              onEdit={handleEdit(product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </BasicPaper>
  );
};

export default SupplierProductListScreen;
