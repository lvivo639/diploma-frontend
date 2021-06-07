import { Box, Button, TextField } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/types';
import { UserFormikProps } from './types';
import validationSchema from './validationSchema';

type UserSettingsFormProps = {
  onSubmit: (values: UserFormikProps) => Promise<void>;
};

const UserSettingsForm: React.FC<UserSettingsFormProps> = ({ onSubmit }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const initialValues: UserFormikProps = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
  };

  const handleSubmit = async (values: UserFormikProps) => {
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
      }: FormikProps<UserFormikProps>) => {
        return (
          <Form>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.firstName && errors.firstName}
                error={Boolean(touched.firstName && errors.firstName)}
              />
            </Box>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.lastName && errors.lastName}
                error={Boolean(touched.lastName && errors.lastName)}
              />
            </Box>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email && errors.email)}
              />
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

export default UserSettingsForm;
