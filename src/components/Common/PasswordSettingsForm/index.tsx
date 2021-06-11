import { Box, Button, TextField } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { PasswordFormikProps } from './types';
import validationSchema from './validationSchema';

type PasswordSettingsFormProps = {
  initialValues: PasswordFormikProps;
  onSubmit: (values: PasswordFormikProps) => Promise<void>;
};

const PasswordSettingsForm: React.FC<PasswordSettingsFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
      }: FormikProps<PasswordFormikProps>) => {
        return (
          <Form>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                label="Old password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password && errors.password}
                error={Boolean(touched.password && errors.password)}
              />
            </Box>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                label="New password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.newPassword && errors.newPassword}
                error={Boolean(touched.newPassword && errors.newPassword)}
              />
            </Box>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                label="Password confirmation"
                name="passwordConfirm"
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.passwordConfirm && errors.passwordConfirm}
                error={Boolean(
                  touched.passwordConfirm && errors.passwordConfirm,
                )}
              />
            </Box>
            <Box p={2}>
              <Button type="submit" variant="contained" color="primary">
                Change
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PasswordSettingsForm;
