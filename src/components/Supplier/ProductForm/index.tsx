import { Box, Button, TextField } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import getImageUrl from './../../../common/getImageUrl';
import { Product } from './../../../common/types';
import { ProductFormikProps } from './types';
import useStyles from './useStyles';
import validationSchema from './validationSchema';

type ProductFormProps = {
  onSubmit: (values: ProductFormikProps) => Promise<void>;
  product?: Product;
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [image, setImage] = React.useState<File | undefined>(undefined);
  const classes = useStyles();
  const initialValues: ProductFormikProps = {
    name: product?.name || '',
    description: product?.description || '',
    oldPrice: product?.oldPrice || undefined,
    price: product?.price || 1,
    count: product?.count || 0,
    files: {
      image: undefined,
    },
  };

  const handleSubmit = async (values: ProductFormikProps) => {
    await onSubmit({ ...values, files: { image } });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
      }: FormikProps<ProductFormikProps>) => {
        return (
          <Form>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name && errors.name}
                error={Boolean(touched.name && errors.name)}
              />
            </Box>

            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                label="Old price"
                name="oldPrice"
                value={values.oldPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.oldPrice && errors.oldPrice}
                error={Boolean(touched.oldPrice && errors.oldPrice)}
              />
            </Box>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.price && errors.price}
                error={Boolean(touched.price && errors.price)}
              />
            </Box>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                label="Count"
                name="count"
                value={values.count}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.count && errors.count}
                error={Boolean(touched.count && errors.count)}
              />
            </Box>

            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.description && errors.description}
                error={Boolean(touched.description && errors.description)}
                rows={4}
                multiline
              />
            </Box>

            <Box p={2}>
              <input
                id="file"
                name="file"
                type="file"
                onChange={(event) => {
                  setImage(event.target?.files?.[0]);
                }}
              />
              {product?.image?.url && (
                <img
                  src={getImageUrl(product?.image?.url)}
                  alt=""
                  className={classes.media}
                />
              )}
            </Box>
            <Box p={2}>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
