import { Box, Button, TextField } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { DropshipperSetting } from './../../../common/types';
import { DropshipperSettingsFormikProps } from './types';
import validationSchema from './validationSchema';

type DropshipperSettingsFormProps = {
  onSubmit: (values: DropshipperSettingsFormikProps) => Promise<void>;
  dropshippersSettings: DropshipperSetting;
};

const DropshipperSettingsForm: React.FC<DropshipperSettingsFormProps> = ({
  dropshippersSettings,
  onSubmit,
}) => {
  const initialValues: DropshipperSettingsFormikProps = {
    telegramUsername: dropshippersSettings?.telegramUsername || '',
    phoneNumber: dropshippersSettings?.phoneNumber || '',
    cardNumber: dropshippersSettings?.cardNumber || '',
  };

  const handleSubmit = async (values: DropshipperSettingsFormikProps) => {
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
      }: FormikProps<DropshipperSettingsFormikProps>) => {
        return (
          <Form>
            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Telegram Id"
                value={dropshippersSettings?.telegramId}
                helperText={
                  'Your telegram ID. We need it to send news from suppliers.'
                }
                disabled
              />
            </Box>

            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Telegram Code"
                value={dropshippersSettings?.telegramCode}
                helperText={
                  'Your telegram code. Send it to our bot from your telegram account so we can know it is you.'
                }
                disabled
              />
            </Box>

            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Telegram Username"
                name="telegramUsername"
                value={values.telegramUsername}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  (touched.telegramUsername && errors.telegramUsername) ||
                  'Enter your telegram username so we can contact you'
                }
                error={Boolean(
                  touched.telegramUsername && errors.telegramUsername,
                )}
              />
            </Box>

            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  (touched.phoneNumber && errors.phoneNumber) ||
                  'Enter your phone number so we can contact you'
                }
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              />
            </Box>

            <Box p={2}>
              <TextField
                variant="outlined"
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={values.cardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  (touched.cardNumber && errors.cardNumber) ||
                  'Enter your card number so we can send you payments'
                }
                error={Boolean(touched.cardNumber && errors.cardNumber)}
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

export default DropshipperSettingsForm;
