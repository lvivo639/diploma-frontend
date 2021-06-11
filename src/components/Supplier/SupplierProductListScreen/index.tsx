import { Box, Grid, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import errorToString from '../../../common/errorToString';
import { Product, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import ProductCard from '../../Common/ProductCard';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';

const SupplierProductListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [productList, setProductList] = React.useState<Array<Product>>([]);

  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  const { currentUser } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setSnackbarText('');
      try {
        setLoading(true);
        const response: any = await dispatch(
          sendRequest('get', `/products`, null, {
            supplier_setting: currentUser?.supplier_setting?.id || '',
          }),
        );
        setProductList(response.data as Array<Product>);
      } catch (e) {
        setSnackbarText(errorToString(e));
      }
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch]);

  const handleAdd = () => history.push('/products/add');

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
        <IconButton onClick={handleAdd}>
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
      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </BasicPaper>
  );
};

export default SupplierProductListScreen;
