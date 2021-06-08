import { Box, Button, TextField } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { OrderFormikProps } from './types';
import validationSchema from './validationSchema';

type OrderFormProps = {
  onSubmit: (values: OrderFormikProps) => Promise<void>;
  minimumPrice: number;
};

const OrderForm: React.FC<OrderFormProps> = ({ minimumPrice, onSubmit }) => {
  const initialValues: OrderFormikProps = {
    address: '',
    fullName: '',
    description: '',
    price: minimumPrice,
  };

  const handleSubmit = async (values: OrderFormikProps) => {
    await onSubmit(values);
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
      }: FormikProps<OrderFormikProps>) => {
        return (
          <Form>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.address && errors.address}
                error={Boolean(touched.address && errors.address)}
              />
            </Box>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Full name"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.fullName && errors.fullName}
                error={Boolean(touched.fullName && errors.fullName)}
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
                multiline
                rows={4}
              />
            </Box>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Price"
                name="price"
                value={values.price}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
                ) => {
                  const newPrice = Number(e.target.value);
                  if (newPrice < minimumPrice) return;
                  handleChange('price')(e.target.value);
                }}
                onBlur={handleBlur}
                helperText={touched.price && errors.price}
                error={Boolean(touched.price && errors.price)}
                type="number"
              />
            </Box>

            <Box p={2}>
              <Button type="submit" variant="contained">
                Create order
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OrderForm;
