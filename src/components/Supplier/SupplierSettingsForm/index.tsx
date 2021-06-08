import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { SupplierSetting } from '../../../common/types';
import { SupplierSettingsFormikProps } from './types';
import validationSchema from './validationSchema';

type SupplierSettingsFormProps = {
  onSubmit: (values: SupplierSettingsFormikProps) => Promise<void>;
  onUniqueHashChange: () => Promise<string>;
  supplierSettings: SupplierSetting;
};

const SupplierSettingsForm: React.FC<SupplierSettingsFormProps> = ({
  supplierSettings,
  onSubmit,
  onUniqueHashChange,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [uniqueHash, setUniqueHash] = React.useState(
    supplierSettings?.uniqueHash || '',
  );

  const initialValues: SupplierSettingsFormikProps = {
    storageName: supplierSettings?.storageName || '',
    description: supplierSettings?.description || '',
  };

  const handleSubmit = async (values: SupplierSettingsFormikProps) => {
    await onSubmit(values);
  };

  const handleUniqueHashChange = async () => {
    setLoading(true);
    const newHash = await onUniqueHashChange();
    setUniqueHash(newHash);
    setLoading(false);
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
      }: FormikProps<SupplierSettingsFormikProps>) => {
        return (
          <Form>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Storage Name"
                name="storageName"
                value={values.storageName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.storageName && errors.storageName}
                error={Boolean(touched.storageName && errors.storageName)}
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

            {loading ? (
              <CircularProgress />
            ) : (
              <Box p={2} display="flex">
                <TextField
                  variant="outlined"
                  fullWidth
                  value={
                    process.env.REACT_APP_FRONTEND_URL + '/invite/' + uniqueHash
                  }
                  helperText={
                    'Your invite link. Share it to give access users to your product list'
                  }
                  disabled
                />
                <Box ml={2}>
                  <Button variant="outlined" onClick={handleUniqueHashChange}>
                    Change
                  </Button>
                </Box>
              </Box>
            )}
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

export default SupplierSettingsForm;
