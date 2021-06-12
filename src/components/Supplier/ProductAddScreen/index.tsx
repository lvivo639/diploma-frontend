import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Product, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import { ProductFormikProps } from '../ProductForm/types';
import errorToString from './../../../common/errorToString';
import ProductForm from './../ProductForm/index';

const ProductAddScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  const onSubmit = async (values: ProductFormikProps, image: any) => {
    setSnackbarText('');
    try {
      setLoading(true);
      const response: any = await dispatch(
        sendRequest('post', '/products', {
          ...values,
          supplier_setting: currentUser?.supplier_setting?.id,
        }),
      );
      const { id } = response.data as Product;

      if (image) {
        let formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'product');
        formData.append('refId', id.toString());
        formData.append('field', 'image');

        await dispatch(
          sendRequest(
            'post',
            '/upload',
            formData,
            {},
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          ),
        );
      }

      setLoading(false);
      history.push(`/products${id}`);
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
  };

  return (
    <BasicPaper
      title="New product"
      subtitle="Fill form to add new product"
      loading={loading}
    >
      <ProductForm onSubmit={onSubmit} />
      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </BasicPaper>
  );
};

export default ProductAddScreen;
