import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Product, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import { ProductFormikProps } from '../ProductForm/types';
import ProductForm from './../ProductForm/index';

const ProductAddScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser } = useSelector((state: RootState) => state.user);

  const onSubmit = async (values: ProductFormikProps) => {
    const response: any = await dispatch(
      sendRequest('post', '/products', {
        ...values,
        supplier_setting: currentUser?.supplier_setting?.id,
      }),
    );
    const { id } = response.data as Product;
    history.push(`/products${id}`);
  };

  return (
    <>
      <Box>
        <Typography variant="h3">New product</Typography>
        <Typography>Fill form to add new product</Typography>
      </Box>
      <ProductForm onSubmit={onSubmit} />
    </>
  );
};

export default ProductAddScreen;
