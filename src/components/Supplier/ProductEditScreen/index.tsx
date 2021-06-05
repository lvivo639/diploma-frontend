import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Product, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import { ProductFormikProps } from '../ProductForm/types';
import ProductForm from './../ProductForm/index';

const ProductEditScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [product, setProduct] = React.useState<Product | undefined>(undefined);

  const { currentUser } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response: any = await dispatch(
        sendRequest('get', `/products/${id}`),
      );
      setProduct(response.data as Product);
      setLoading(false);
    };
    fetchData();
  }, [dispatch, id]);

  const onSubmit = async (values: ProductFormikProps) => {
    setLoading(true);
    const response: any = await dispatch(
      sendRequest('put', `/products/${id}`, {
        ...values,
        supplier_setting: currentUser?.supplier_setting?.id,
      }),
    );
    setProduct(response.data as Product);
    setLoading(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <ProductForm onSubmit={onSubmit} product={product} />
    </>
  );
};

export default ProductEditScreen;
